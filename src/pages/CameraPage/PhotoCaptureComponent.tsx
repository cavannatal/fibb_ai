import React, { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Camera, Upload } from 'lucide-react';
import { motion } from 'framer-motion';

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
  |'left_hand_palm'
  |'left_hand_top'
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
  'smile_noteeth_left': smileNoTeethImage, // Assuming you want to use the same image
  'smile_noteeth_right': smileNoTeethImage, // Assuming you want to use the same image
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
  'both_legs': bodyFront, // Assuming full body shot for legs
  'right_leg': bodyFront, // Assuming full body shot for right leg
  'left_leg': bodyFront // Assuming full body shot for left leg
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
  const [capturedImages, setCapturedImages] = useState<CapturedImage[]>([]);
  const [currentExpressionIndex, setCurrentExpressionIndex] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
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

  // Mock upload function for testing purposes
  const handleMockUpload = async () => {
    if (capturedImages.length !== PHOTOS_PER_EXPRESSION) {
      alert(`Please capture exactly ${PHOTOS_PER_EXPRESSION} photos before uploading.`);
      return;
    }

    setIsUploading(true);
    // Simulate a delay to mimic network request
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    alert(`Photos for ${expressionDisplayNames[currentExpression]} expression uploaded successfully! (Mock)`);
    setCapturedImages([]);
    setCurrentExpressionIndex(prev => prev + 1);
    setIsUploading(false);
  };

  // Comment out the real upload function
  /// THIS FUNCTION IS RESPONSIBLE FOR SENDING THE DATA I THINK LOOK HERE

  /*
  const handleUpload = async () => {
    if (capturedImages.length !== PHOTOS_PER_EXPRESSION) {
      alert(`Please capture exactly ${PHOTOS_PER_EXPRESSION} photos before uploading.`);
      return;
    }

    setIsUploading(true);
    try {
      const response = await fetch('/api/upload-photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(capturedImages),
      });

      if (response.ok) {
        alert(`Photos for ${expressionDisplayNames[currentExpression]} expression uploaded successfully!`);
        setCapturedImages([]);
        setCurrentExpressionIndex(prev => prev + 1);
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading photos:', error);
      alert('Failed to upload photos. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };
  */

  const handleImageError = () => {
    setImageError(`Failed to load overlay image for ${expressionDisplayNames[currentExpression]}`);
    console.error(`Image load error for: ${currentExpression}.png`);
  };

  if (currentExpressionIndex >= EXPRESSIONS.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black p-4">
        <h2 className="text-2xl font-bold mb-4 text-white">All expressions completed!</h2>
        <p className="text-lg text-white">Thank you for participating.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black p-4">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Capture {expressionDisplayNames[currentExpression]} - Photo {capturedImages.length} of {PHOTOS_PER_EXPRESSION}
      </h2>
      <p className="text-lg mb-4 text-white">{expressionInstructions[currentExpression]}</p>
      <div className="relative">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="rounded-lg shadow-lg scale-x-[-1]"
          mirrored={true}
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
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={capture}
        disabled={capturedImages.length >= PHOTOS_PER_EXPRESSION}
        className={`mt-4 bg-blue-500 text-white px-4 py-2 rounded-full flex items-center ${capturedImages.length >= PHOTOS_PER_EXPRESSION ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <Camera className="mr-2" /> Capture Photo ({capturedImages.length} of {PHOTOS_PER_EXPRESSION})
      </motion.button>
      
      <div className="w-full max-w-4xl mt-8">
        <h3 className="text-xl font-bold mb-2 text-white">Captured Photos for {expressionDisplayNames[currentExpression]}</h3>
        <div className="grid grid-cols-4 gap-2">
          {capturedImages.map((img, index) => (
            <div key={index} className="relative">
              <img src={img.src} alt={`captured ${index}`} className="w-full h-24 object-cover rounded" />
              <span className="absolute bottom-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded">
                {img.position}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleMockUpload}  // Changed to use mock upload function
        disabled={isUploading || capturedImages.length !== PHOTOS_PER_EXPRESSION}
        className={`mt-4 bg-green-500 text-white px-4 py-2 rounded-full flex items-center ${(isUploading || capturedImages.length !== PHOTOS_PER_EXPRESSION) ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <Upload className="mr-2" /> {isUploading ? 'Uploading...' : `Upload ${expressionDisplayNames[currentExpression]} Photos & Continue`}
      </motion.button>
    </div>
  );
};

export default PhotoCaptureComponent;