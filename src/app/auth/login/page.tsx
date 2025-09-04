'use client'
import { useState } from "react";
import {
  ArrowRight,
  Users,
  Shield,
  BarChart3,
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "../../../components/ui/Button";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const router = useRouter();

  // Placeholder authentication function
  const login = async () => {
    // TODO: Implement actual authentication
    return { success: true };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    try {
      await login();
      // Placeholder for authentication logic
      router.push("/dashboard");
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToHome = () => {
    router.push("/");
  };

  const handleDemoLogin = () => {
    setFormData({
      email: "ayomideogunsona13@gmail.com",
      password: "admin",
    });
  };

  const navigateToSignup = () => {
    router.push("/auth/signup");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
      <style jsx>{`
        .floating-animation {
          animation: float 6s ease-in-out infinite;
        }

        .floating-animation:nth-child(2) {
          animation-delay: -2s;
        }

        .floating-animation:nth-child(3) {
          animation-delay: -4s;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        .slide-in {
          animation: slideIn 0.5s ease-out forwards;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .glow-effect {
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.1);
          transition: box-shadow 0.3s ease;
        }

        .glow-effect:hover {
          box-shadow: 0 0 30px rgba(16, 185, 129, 0.2);
        }
      `}</style>

      {/* Back to Home Button - Fixed Position */}
      <button
        onClick={handleBackToHome}
        className="fixed top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:bg-gray-50 z-10"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-medium">Back to Home</span>
      </button>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-animation absolute top-20 left-10 w-16 h-16 bg-green-200 rounded-full opacity-20"></div>
        <div className="floating-animation absolute top-40 right-20 w-12 h-12 bg-green-300 rounded-full opacity-30"></div>
        <div className="floating-animation absolute bottom-32 left-20 w-20 h-20 bg-green-100 rounded-full opacity-25"></div>
        <div className="floating-animation absolute bottom-20 right-10 w-14 h-14 bg-green-400 rounded-full opacity-20"></div>
      </div>

      <div className="w-full max-w-6xl mx-auto flex items-center justify-center gap-8">
        {/* Left side - Branding and info */}
        <div className="hidden lg:flex flex-col justify-center w-1/2 px-8">
          <div className="mb-8">
            <h1 className="text-5xl font-extrabold text-black mb-4">
              Welcome back to <span className="text-green-500">FINABLE</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Continue your journey towards educational excellence.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md glow-effect">
              <div className="bg-green-500 p-3 rounded-full">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Secure & Trusted</h3>
                <p className="text-gray-600">
                  Your data is protected with enterprise-grade security
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md glow-effect">
              <div className="bg-green-500 p-3 rounded-full">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Track Progress</h3>
                <p className="text-gray-600">
                  Monitor your campaigns and donations in real-time
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md glow-effect">
              <div className="bg-green-500 p-3 rounded-full">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Community Driven</h3>
                <p className="text-gray-600">
                  Connect with like-minded supporters and students
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="w-full lg:w-1/2 max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8 glow-effect">
            {/* Mobile Back Button - Inside the form for smaller screens */}
            <div className="lg:hidden mb-4">
              <button
                onClick={handleBackToHome}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </button>
            </div>

            <div className="slide-in">
              <h2 className="text-3xl font-bold text-center mb-2">
                Welcome Back!
              </h2>
              <p className="text-gray-600 text-center mb-8">
                Sign in to continue your journey
              </p>

              {/* Demo Login Button */}
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700 mb-2">
                  <strong>Demo Account:</strong>
                </p>
                <p className="text-sm text-blue-600 mb-3">
                  Email: ayomideogunsona13@gmail.com
                  <br />
                  Password: admin
                </p>
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="text-sm bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Fill Demo Credentials
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="text-green-500 focus:ring-green-500"
                    />
                    <span className="ml-2 text-gray-600">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-green-600 hover:text-green-700 font-semibold"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    icon={<ArrowRight className="w-4 h-4" />}
                    className="hover:shadow-lg transform"
                    disabled={isLoading}
                    title={isLoading ? "Signing In..." : "Sign In"}
                  />
                </div>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Don&apos;t have an account?{" "}
                  <button
                    onClick={navigateToSignup}
                    className="text-green-600 hover:text-green-700 font-semibold hover:underline"
                    disabled={isLoading}
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;