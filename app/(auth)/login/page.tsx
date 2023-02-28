import LoginForm from './LoginForm';

type Props = { searchParams: { returnTo?: string | string[] } };

export default function LoginPage(props: Props) {
  return <LoginForm returnTo={props.searchParams.returnTo} />;
}
