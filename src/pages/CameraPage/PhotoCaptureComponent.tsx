import React, { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Camera, Upload, RotateCw } from 'lucide-react';
import { motion } from 'framer-motion';
import awsconfig from '../../aws-exports';
import { Amplify } from 'aws-amplify';
import { getCurrentUser } from 'aws-amplify/auth';

// Import images
import neutralImage from './images/neutral.png';
import smileNoTeethImage from './images/smile_noteeth.png';
import mysSmile from './images/smirk_mysterious.png';
import mysSmileLeft from './images/smirk_mysterious_left.png';
import mysSmileRight from './images/smirk_mysterious_right.png';
import smileTeethImage from './images/smile_teeth.png';
import smileteethLeft from './images/smile_teeth_left.png';
import smileteethRight from './images/smile_teeth_right.png';
import confidenteyes from './images/confident_eyes.png';
import excitedLeft from './images/excited_left.png';
import excitedRight from './images/excited_right.png';
import leftHandBack from './images/left_hand_back.png';
import leftHandPalm from './images/left_hand_palm.png';
import rightHandBack from './images/right_hand_back.png';
import rightHandPalm from './images/right_hand_palm.png';
import clenchedFist from './images/fist_clench.png';
import bodyFront from './images/body_confident.png';
import bodyRight from './images/body_right.png';
import bodyTurnaround from './images/body_turnaround.png';
import bodyLeft from './images/body_left.png';
import bodyHandsUp from './images/body_arms_up.png';
import bodyHandsDown from './images/body_arms_down.png';
import { getCurrentTimeStamp } from '../../utils';
import { useLocation } from 'react-router-dom';

Amplify.configure(awsconfig)

type Expression = 
  | 'neutral'
  | 'smile_noteeth'
  | 'smile_noteeth_left'
  | 'smile_noteeth_right'
  | 'smile_teeth'
  | 'smile_teeth_left'
  | 'smile_teeth_right'
  | 'smirk_mysterious'
  | 'smirk_mysterious_left'
  | 'smirk_mysterious_right'
  | 'confident_eyes'
  | 'excited_left'
  | 'excited_right'
  | 'step_back_confident'
  | 'body_turn_right'
  | 'body_turn_left'
  | 'body_turn_around'
  | 'body_arms_up'
  | 'body_arms_down'
  | 'right_hand_palm'
  | 'right_hand_top'
  | 'left_hand_palm'
  | 'left_hand_top'
  | 'clench_fist'
  | 'both_legs'
  | 'right_leg'
  | 'left_leg';

interface CapturedImage {
  src: string;
  expression: Expression;
  position: number;
}

const PHOTOS_PER_EXPRESSION = 5;
const EXPRESSIONS: Expression[] = [
  'neutral',
  'smile_noteeth',
  'smile_noteeth_left',
  'smile_noteeth_right',
  'smile_teeth',
  'smile_teeth_left',
  'smile_teeth_right',
  'smirk_mysterious',
  'smirk_mysterious_left',
  'smirk_mysterious_right',
  'confident_eyes',
  'excited_left',
  'excited_right',
  'step_back_confident',
  'body_turn_right',
  'body_turn_left',
  'body_turn_around',
  'body_arms_up',
  'body_arms_down',
  'right_hand_palm',
  'right_hand_top',
  'left_hand_palm',
  'left_hand_top',
  'clench_fist',
  'both_legs',
  'right_leg',
  'left_leg'
];

const expressionImageMap: Record<Expression, string> = {
  'neutral': neutralImage,
  'smile_noteeth': smileNoTeethImage,
  'smile_noteeth_left': smileNoTeethImage,
  'smile_noteeth_right': smileNoTeethImage, 
  'smile_teeth': smileTeethImage,
  'smile_teeth_left': smileteethLeft,
  'smile_teeth_right': smileteethRight,
  'smirk_mysterious': mysSmile,
  'smirk_mysterious_left': mysSmileLeft,
  'smirk_mysterious_right': mysSmileRight,
  'confident_eyes': confidenteyes,
  'excited_left': excitedLeft,
  'excited_right': excitedRight,
  'step_back_confident': bodyFront,
  'body_turn_right': bodyRight,
  'body_turn_left': bodyLeft,
  'body_turn_around': bodyTurnaround,
  'body_arms_up': bodyHandsUp,
  'body_arms_down': bodyHandsDown,
  'right_hand_palm': rightHandPalm,
  'right_hand_top': rightHandBack,
  'left_hand_palm': leftHandPalm,
  'left_hand_top': leftHandBack,
  'clench_fist': clenchedFist,
  'both_legs': bodyFront, 
  'right_leg': bodyFront, 
  'left_leg': bodyFront 
};

const expressionInstructions: Record<Expression, string> = {
  'neutral': "Keep a neutral expression",
  'smile_noteeth': "Smile naturally without showing teeth",
  'smile_noteeth_left': "Smile without teeth, turning slightly to your left",
  'smile_noteeth_right': "Smile without teeth, turning slightly to your right",
  'smile_teeth': "Smile broadly, showing your teeth",
  'smile_teeth_left': "Smile showing teeth, turning slightly to your left",
  'smile_teeth_right': "Smile showing teeth, turning slightly to your right",
  'smirk_mysterious': "Give a slight, mysterious smirk",
  'smirk_mysterious_left': "Smirk mysteriously, turning slightly to your left",
  'smirk_mysterious_right': "Smirk mysteriously, turning slightly to your right",
  'confident_eyes': "Look directly at the camera with confident eyes",
  'excited_left': "Look excited, turning to your left",
  'excited_right': "Look excited, turning to your right",
  'step_back_confident': "Take a step back and stand confidently",
  'body_turn_right': "Turn your body slightly to the right",
  'body_turn_left': "Turn your body slightly to the left",
  'body_turn_around': "Turn your body around, showing your back",
  'body_arms_up': "Raise both arms up",
  'body_arms_down': "Keep both arms down by your sides",
  'right_hand_palm': "Show your right hand palm to the camera",
  'right_hand_top': "Show the top of your right hand to the camera",
  'left_hand_palm': "Show your left hand palm to the camera",
  'left_hand_top': "Show the top of your left hand to the camera",
  'clench_fist': "Clench your fist and show it to the camera",
  'both_legs': "Show both of your legs to the camera",
  'right_leg': "Show your right leg to the camera",
  'left_leg': "Show your left leg to the camera"
};

const expressionDisplayNames: Record<Expression, string> = {
  'neutral': "Neutral",
  'smile_noteeth': "Smile (No Teeth)",
  'smile_noteeth_left': "Smile No Teeth (Left)",
  'smile_noteeth_right': "Smile No Teeth (Right)",
  'smile_teeth': "Smile (Teeth)",
  'smile_teeth_left': "Smile Teeth (Left)",
  'smile_teeth_right': "Smile Teeth (Right)",
  'smirk_mysterious': "Mysterious Smirk",
  'smirk_mysterious_left': "Mysterious Smirk (Left)",
  'smirk_mysterious_right': "Mysterious Smirk (Right)",
  'confident_eyes': "Confident Eyes",
  'excited_left': "Excited (Left)",
  'excited_right': "Excited (Right)",
  'step_back_confident': "Step Back Confident",
  'body_turn_right': "Body Turn Right",
  'body_turn_left': "Body Turn Left",
  'body_turn_around': "Body Turn Around",
  'body_arms_up': "Arms Up",
  'body_arms_down': "Arms Down",
  'right_hand_palm': "Right Hand Palm",
  'right_hand_top': "Right Hand Top",
  'left_hand_palm': "Left Hand Palm",
  'left_hand_top': "Left Hand Top",
  'clench_fist': "Clenched Fist",
  'both_legs': "Both Legs",
  'right_leg': "Right Leg",
  'left_leg': "Left Leg"
};

const PhotoCaptureComponent: React.FC = () => {
  const { state } = useLocation();
  const [capturedImages, setCapturedImages] = useState<CapturedImage[]>([]);
  const [currentExpressionIndex, setCurrentExpressionIndex] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const webcamRef = useRef<Webcam>(null);

  const currentExpression = EXPRESSIONS[currentExpressionIndex];

  useEffect(() => {
    setImageError(null);
  }, [currentExpression]);

  const capture = useCallback(() => {
    if (capturedImages.length >= PHOTOS_PER_EXPRESSION) {
      alert("You've captured all photos for this expression!");
      return;
    }

    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImages(prev => [...prev, { 
        src: imageSrc, 
        expression: currentExpression, 
        position: prev.length + 1 
      }]);
    }
  }, [capturedImages.length, currentExpression]);

  const handleUpload = async () => {
    if (capturedImages.length !== PHOTOS_PER_EXPRESSION) {
      alert(`Please capture exactly ${PHOTOS_PER_EXPRESSION} photos before uploading.`);
      return;
    }
  
    setIsUploading(true);
  
    try {
      // Get the user sub before proceeding
      const { userId } = await getCurrentUser();
      const sub = userId; // or use username if that's what you need
  
      const uploadPromises = capturedImages.map(async (image, index) => {
        const timestamp = getCurrentTimeStamp();
  
        // Construct file name using the retrieved 'sub'
        const fileName = `users/${sub}/photos/${state.startingTimestamp}/${currentExpression}/${timestamp}_${index + 1}.jpg`;
        const response = await fetch(image.src);
        const blob = await response.blob();
  
        // Requesting the presigned URL from the Lambda function
        const presignedUrlResponse = await fetch('https://rn3fz2qkeatimhczxdtivhxne40lnkhr.lambda-url.us-east-2.on.aws/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fileName: fileName,
            fileType: blob.type,
          }),
        });
  
        if (!presignedUrlResponse.ok) {
          throw new Error(`Failed to get presigned URL for ${fileName}`);
        }
  
        const { uploadUrl } = await presignedUrlResponse.json();
  
        // Upload to S3
        const s3UploadResponse = await fetch(uploadUrl, {
          method: 'PUT',
          body: blob,
          headers: {
            'Content-Type': blob.type,
          },
        });
  
        if (!s3UploadResponse.ok) {
          throw new Error(`Failed to upload ${fileName}`);
        }
  
        return { success: true };
      });
  
      await Promise.all(uploadPromises);
      setCapturedImages([]);
      setCurrentExpressionIndex((prev) => prev + 1);
    } catch (error) {
      console.error('Error uploading photos:', error);
      alert('Failed to upload photos. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleImageError = () => {
    setImageError(`Failed to load overlay image for ${expressionDisplayNames[currentExpression]}`);
    console.error(`Image load error for: ${currentExpression}.png`);
  };

  const flipCamera = () => {
    setFacingMode(prevMode => prevMode === 'user' ? 'environment' : 'user');
  };

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (currentExpressionIndex >= EXPRESSIONS.length) {
    fetch('https://generate-lora-qf5pfnz9i-fahadfahim13s-projects.vercel.app/generate-lora', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sub: state.sub,
        "steps": 3500,
        "photoFolderName": state.startingTimestamp
      }),
    });
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
        <h2 className="text-2xl font-bold mb-4 text-[#084248]">All expressions completed!</h2>
        <p className="text-lg text-gray-600">Thank you for participating.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
      <h2 className="text-2xl font-bold mb-4 text-[#084248]">
        Capture {expressionDisplayNames[currentExpression]} - Photo {capturedImages.length} of {PHOTOS_PER_EXPRESSION}
      </h2>
      <p className="text-lg mb-4 text-gray-600">{expressionInstructions[currentExpression]}</p>
      <div className="relative">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="rounded-lg shadow-lg scale-x-[-1]"
          mirrored={facingMode === 'user'}
          videoConstraints={{ facingMode }}
        />
        <img
          src={expressionImageMap[currentExpression]}
          alt={`${expressionDisplayNames[currentExpression]} overlay`}
          className="absolute top-0 left-0 w-full h-full opacity-50 pointer-events-none"
          onError={handleImageError}
        />
        {imageError && (
          <div className="absolute top-0 left-0 w-full bg-red-500 text-white p-2 text-sm">
            {imageError}
          </div>
        )}
      </div>
      <div className="flex mt-4 space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={capture}
          disabled={capturedImages.length >= PHOTOS_PER_EXPRESSION}
          className={`bg-[#084248] text-white px-6 py-3 rounded-2xl flex items-center transition-all duration-300 ${capturedImages.length >= PHOTOS_PER_EXPRESSION ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#0a5761]'}`}
        >
          <Camera className="mr-2" /> Capture Photo ({capturedImages.length} of {PHOTOS_PER_EXPRESSION})
        </motion.button>
        {isMobile && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={flipCamera}
            className="bg-[#084248] text-white px-6 py-3 rounded-2xl flex items-center transition-all duration-300 hover:bg-[#0a5761]"
          >
            <RotateCw className="mr-2" /> Flip Camera
          </motion.button>
        )}
      </div>
      
      <div className="w-full max-w-4xl mt-8">
        <h3 className="text-xl font-bold mb-2 text-[#084248]">Captured Photos for {expressionDisplayNames[currentExpression]}</h3>
        <div className="grid grid-cols-4 gap-2">
          {capturedImages.map((img, index) => (
            <div key={index} className="relative">
              <img src={img.src} alt={`captured ${index}`} className="w-full h-24 object-cover rounded-lg" />
              <span className="absolute bottom-0 right-0 bg-[#084248] bg-opacity-75 text-white text-xs p-1 rounded-bl-lg">
                {img.position}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleUpload}
        disabled={isUploading || capturedImages.length !== PHOTOS_PER_EXPRESSION}
        className={`mt-4 bg-[#084248] text-white px-6 py-3 rounded-2xl flex items-center transition-all duration-300 ${(isUploading || capturedImages.length !== PHOTOS_PER_EXPRESSION) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#0a5761]'}`}
      >
        <Upload className="mr-2" /> {isUploading ? 'Uploading...' : `Upload ${expressionDisplayNames[currentExpression]} Photos & Continue`}
      </motion.button>
    </div>
  );
};

export default PhotoCaptureComponent;