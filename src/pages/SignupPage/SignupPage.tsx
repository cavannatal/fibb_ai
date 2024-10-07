import React, { useState, useEffect, ChangeEvent } from 'react';
import { 
  Authenticator, 
  CheckboxField, 
  ThemeProvider, 
  Theme, 
  useTheme, 
  View, 
  Image, 
  Heading 
} from '@aws-amplify/ui-react';
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import '@aws-amplify/ui-react/styles.css';
import logoImg from '../../components/images/FibbLogoBlack.svg';
import signupGrid from '../../components/images/signingrid.png';

interface SignupProps {
  onUserChange: (user: any) => void;
}

const Logo = () => (
  <Image
    alt="logo"
    src={logoImg}
    width="16vh"
  />
);

const useAgreementCheckbox = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return { isChecked, handleCheckboxChange };
};

const AgreementCheckbox = () => {
  const { isChecked, handleCheckboxChange } = useAgreementCheckbox();

  return (
    <>
      <CheckboxField
        label="I agree to the Terms of Service and Privacy Policy"
        name="agreement"
        value="agree"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      {!isChecked && (
        <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>
          You must agree to the Terms of Service and Privacy Policy to create an account.
        </p>
      )}
    </>
  );
};

const CustomSignUp = () => {
  return (
    <>
      <Authenticator.SignUp.FormFields />
      <AgreementCheckbox />
    </>
  );
};

export const checkUser = async () => {
  try {
    const currentUser = await getCurrentUser();
    return currentUser;
  } catch (err) {
    return null;
  }
};

export const handleSignOut = async () => {
  try {
    await signOut();
  } catch (error) {
    console.error('Error signing out: ', error);
  }
};

// Custom hook for screen size
const useScreenSize = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return isSmallScreen;
};

export const Signup: React.FC<SignupProps> = ({ onUserChange }) => {
  const { tokens } = useTheme();
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState<any>(null);
  const isSmallScreen = useScreenSize();

  useEffect(() => {
    if (authUser) {
      onUserChange(authUser);
      navigate('/');
    }
  }, [authUser, onUserChange, navigate]);

  const theme: Theme = {
    name: 'Custom Auth Theme',
    tokens: {
      colors: {
        brand: {
          primary: '#084248',
        },
        background: {
          primary: 'white',
        },
      },
      components: {
        authenticator: {
          router: {
            borderWidth: '0',
            backgroundColor: 'white',
            boxShadow: 'none',
          },
        },
        button: {
          backgroundColor: '#FFA500',
          _hover: {
            backgroundColor: '#FF8C00',
          },
        },
      },
    },
  };

  const components = {
    Header() {
      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Logo />
        </View>
      );
    },
    SignIn: {
      Header() {
        return (
          <Heading level={3} padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}>
            Sign in to your account
          </Heading>
        );
      },
    },
    SignUp: {
      Header() {
        return (
          <Heading level={3} padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}>
            Create a new account
          </Heading>
        );
      },
      FormFields: CustomSignUp
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <View
        style={{
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
          minHeight: '100vh',
          width: '100vw',
          position: 'relative',
        }}
      >
        {/* Gradient left side with image overlay */}
        <View
          style={{
            flex: isSmallScreen ? 'none' : '1',
            background: 'linear-gradient(180deg, #084248 30%, rgba(8,66,72,0.7) 100%)',
            position: 'relative',
            minHeight: isSmallScreen ? '200px' : 'auto',
            overflow: 'hidden',
          }}
        >
          {/* Image overlay */}
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${signupGrid})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.3,
            }}
          />
          {/* Welcome message */}
          <View
            style={{
              position: isSmallScreen ? 'relative' : 'absolute',
              top: isSmallScreen ? '0' : '30%',
              left: '0',
              right: '0',
              transform: isSmallScreen ? 'none' : 'translateY(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontFamily: '"Sofia Pro Bold", sans-serif',
              padding: isSmallScreen ? '2rem 0' : '0',
              zIndex: 1,
            }}
          >
            <Heading
              level={1}
              style={{
                color: 'white',
                fontSize: isSmallScreen ? '4rem' : '6rem',
                fontWeight: 'normal',
                textAlign: 'center',
                marginBottom: '1rem',
                fontFamily: 'inherit',
              }}
            >
              Welcome
            </Heading>
            <Heading
              level={1}
              style={{
                color: 'white',
                fontSize: isSmallScreen ? '4rem' : '6rem',
                fontWeight: 'normal',
                textAlign: 'center',
                fontFamily: 'inherit',
              }}
            >
              to <span style={{ color: '#FFA500', fontWeight: 'bold' }}>fibb</span>.
            </Heading>
          </View>
        </View>
        
        {/* Right side with auth UI */}
        <View
          style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            backgroundColor: 'white',
            padding: isSmallScreen ? '2rem' : '2rem 2rem 2rem 2rem',
            paddingTop: isSmallScreen ? '2rem' : '15vh',
            minHeight: isSmallScreen ? 'calc(100vh - 200px)' : '100vh',
            overflowY: 'auto',
          }}
        >
          <View style={{ flex: '1', marginBottom: isSmallScreen ? '60px' : '0' }}>
            <Authenticator components={components}>
              {({ signOut, user }) => {
                if (user && !authUser) {
                  setAuthUser(user);
                }
                return <div></div>;
              }}
            </Authenticator>
          </View>
        </View>
        
       
      </View>
    </ThemeProvider>
  );
};

export default Signup;