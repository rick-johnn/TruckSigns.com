import { Layout } from '../components/layout';
import { SignupForm } from '../components/auth';

const Signup = () => {
  return (
    <Layout>
      <div className="py-16 lg:py-24">
        <SignupForm />
      </div>
    </Layout>
  );
};

export default Signup;
