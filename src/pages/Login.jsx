import { Layout } from '../components/layout';
import { LoginForm } from '../components/auth';

const Login = () => {
  return (
    <Layout>
      <div className="py-16 lg:py-24">
        <LoginForm />
      </div>
    </Layout>
  );
};

export default Login;
