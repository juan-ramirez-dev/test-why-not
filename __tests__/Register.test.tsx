import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/app/utils/test_store';
import RegisterPage from '@/app/register/page';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from '@/app/utils/constants';


// Mock de dependencias externas
jest.mock('next/image', () => ({ src, alt } : {src : string, alt : string}) => <img src={src} alt={alt} />);
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  }
}));

describe('RegisterPage Component', () => {

  it('renders without crashing', () => {
    render(
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID} >
        <Provider store={store}>
          <RegisterPage />
        </Provider>
      </GoogleOAuthProvider>
    );
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('updates state on input change', () => {
    render(
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID} >
        <Provider store={store}>
          <RegisterPage />
        </Provider>
      </GoogleOAuthProvider>
    );
    const nameInput = screen.getByPlaceholderText('Stan Smith');
    fireEvent.change(nameInput, { target: { name: 'name', value: 'Daniel Ramirez'}});
    expect(nameInput).toHaveValue('Daniel Ramirez');
  });

  it('Register button click', () => {
    render(
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID} >
        <Provider store={store}>
          <RegisterPage />
        </Provider>
      </GoogleOAuthProvider>
    );
    const registerButton = screen.getByText('Register Now');
    fireEvent.click(registerButton);
  });
});
