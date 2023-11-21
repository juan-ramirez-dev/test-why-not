import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import LoginPage from '@/app/login/page';
import { store } from '@/app/utils/test_store';


// Mock de dependencias externas
jest.mock('next/image', () => ({ src, alt } : {src : string, alt : string}) => <img src={src} alt={alt} />);
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  }
}));

describe('LoginPage Component', () => {

  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('updates state on input change', () => {
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
    const emailInput = screen.getByPlaceholderText('xxxxxxxx@xxxxx.com');
    fireEvent.change(emailInput, { target: { name: 'email', value: 'test@example.com' } });
    expect(emailInput).toHaveValue('test@example.com');
  });

  it('Login button click', async () => {
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
    const loginButton = screen.getByText('Sign In');
    fireEvent.click(loginButton);

  });

});
