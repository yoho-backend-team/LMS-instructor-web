import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import Logo from "../../../assets/icons/navbar/icons8-ionic-50.png";
import { COLORS, FONTS } from "@/constants/uiConstants";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { authEmailVerification } from "@/features/Authentication/services";
import { toast } from "react-toastify";

type EmailData = {
  email: string;
};

const EmailVerification = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailData>({});

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const onSubmit = async (data: EmailData) => {
    setIsLoading(true);
    try {
      if (data.email) {
        const response = await authEmailVerification(data);
        if (response) {
          toast.success("OTP sent to your email address.");
          navigate("/otp-verify", {
            state: {
              email: data?.email,
              data: response?.data,
            },
          });
        } else {
          toast.error("Username/Email not registered");
        }
      }
    } catch (error: any) {
      toast.error("Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className={`flex bg-[#ebeff3] w-full h-[100vh] p-4 gap-4 ${
        !isDesktop ? "justify-center items-center" : ""
      }`}
    >
      {/* Form Section */}
      <div className={`${isDesktop ? "w-1/2" : "w-full max-w-md"} h-full`}>
        <Card
          className="bg-[#ebeff3] w-full h-full rounded-md px-4 flex justify-center cursor-pointer"
          style={{
            boxShadow: `
              rgba(255, 255, 255, 0.7) -4px -4px 4px,
              rgba(189, 194, 199, 0.75) 5px 5px 4px
            `,
          }}
        >
          <div className="flex flex-col items-center">
            <Card
              className="bg-[#ebeff3] w-[50px] h-[50px] rounded-full flex items-center justify-center cursor-pointer"
              style={{
                boxShadow: `
                  rgba(255, 255, 255, 0.7) -4px -4px 4px,
                  rgba(189, 194, 199, 0.75) 5px 5px 4px
                `,
              }}
            >
              <img src={Logo} alt="logo" style={{ width: 20, height: 20 }} />
            </Card>
            
            {/* Responsive heading */}
            <p
              className="text-center my-3 mb-10 text-sm sm:text-base md:text-lg lg:text-xl"
              style={{ ...FONTS.heading_02 }}
            >
              Email Verification
            </p>
            
            <form onSubmit={handleSubmit(onSubmit)} className="w-full my-4">
              {/* Email */}
              <div className="w-full">
                <label 
                  className="text-sm sm:text-base md:text-lg"
                  style={{ ...FONTS.heading_04 }}
                >
                  Email Or Username
                </label>
                <input
                  type="email"
                  style={{ ...FONTS.heading_06 }}
                  {...register("email", { required: "Email is required" })}
                  className="w-full mb-3 mt-2 rounded-md px-4 py-2 text-sm sm:text-base lg:text-lg shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] outline-none"
                />
                {errors.email && (
                  <span 
                    className="text-xs sm:text-sm md:text-base"
                    style={{ ...FONTS.para_03, color: COLORS.light_red }}
                  >
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full my-6 mt-8 py-2 rounded-md flex justify-center items-center gap-2 transition text-sm sm:text-base lg:text-lg
                  bg-gradient-to-r from-[#7B00FF] to-[#B200FF]
                  ${isLoading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                style={{ ...FONTS.heading_04, color: COLORS.white }}
              >
                {isLoading && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
                {isLoading ? "Verifying..." : "Verify"}
              </button>

              <div
                className="flex items-center gap-2 justify-center cursor-pointer"
                onClick={() => navigate("/login")}
              >
                <IoMdArrowRoundBack color={COLORS.blue_02} />
                <p 
                  className="text-xs sm:text-sm md:text-base"
                  style={{ ...FONTS.heading_06, color: COLORS.blue_02 }}
                >
                  Back to Login
                </p>
              </div>
            </form>
          </div>
        </Card>
      </div>

      {/* Gradient Section (Desktop only) */}
      {isDesktop && (
        <div className="w-1/2 h-full">
          <Card
            className="bg-gradient-to-l from-[#B200FF] to-[#7B00FF] w-full h-full rounded-md flex items-center justify-center cursor-pointer"
            style={{
              boxShadow: `
                rgba(255, 255, 255, 0.7) -4px -4px 4px,
                rgba(189, 194, 199, 0.75) 5px 5px 4px
              `,
            }}
          ></Card>
        </div>
      )}
    </div>
  );
};

export default EmailVerification;