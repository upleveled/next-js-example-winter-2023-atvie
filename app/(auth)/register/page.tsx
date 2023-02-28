import RegisterForm from './RegisterForm';

type Props = { searchParams: { returnTo?: string | string[] } };

export default function RegisterPage(props: Props) {
  return <RegisterForm returnTo={props.searchParams.returnTo} />;
}
