import { AtSymbolIcon, KeyIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  ButtonPrimary,
  FloatInput,
  svg_desktop_login,
  svg_facebook,
  svg_google,
  svg_twitter,
} from "../../../components";
import { clearState, signIn } from "../services/AuthSlice";

export interface PageLoginProps {
  className?: string;
}

type LoginForm = {
  username: string;
  password: string;
};

const loginSocials = [
  {
    name: "Lanjutkan dengan Facebook",
    href: "#",
    icon: svg_facebook,
  },
  {
    name: "Lanjutkan dengan Twitter",
    href: "#",
    icon: svg_twitter,
  },
  {
    name: "Lanjutkan dengan Google",
    href: "#",
    icon: svg_google,
  },
];

const Login: FC<PageLoginProps> = ({ className = "" }) => {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isSuccess, isError, isFetching, errorMessage } =
    useAppSelector((state) => state.auth);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  });

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    console.log(isSuccess)
    if (isSuccess) {
      dispatch(clearState({}));
      return navigate("/profile");
    }
    
  }, [isSuccess, dispatch, navigate]);

  const doLogin = (data: LoginForm) => {
    dispatch(
      signIn({
        email: data.username,
        password: data.password,
      })
    );
  };

  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <div className="container mb-24 lg:mb-32 flex mt-10">
        <div
          className="hidden lg:flex w-full lg:w-1/2 login_img_section
          justify-around items-center">
          <div className="bg-black opacity-20 inset-0 z-0"></div>
          <div className="w-full mx-auto px-20 flex-col items-center">
            <div className="flex justify-center lg:justify-start">
              <img alt="" src={svg_desktop_login} className="" />
            </div>
          </div>
        </div>
        <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
          <div className="w-full px-2 md:px-32 lg:px-24">
            <form
              onSubmit={handleSubmit(doLogin)}
              className="bg-white rounded-md shadow-2xl p-5">
              <h1 className="text-gray-600 font-bold text-2xl">
                Selamat Datang
              </h1>
              <p className="text-sm font-normal text-gray-500 mb-8">
                Yuk Masuk
              </p>

              <div className="mb-2"></div>
              <FloatInput
                Icon={AtSymbolIcon}
                type="email"
                label="Email"
                id="email"
                {...register("username")}
                isError={errors.username}
                errorMessage={errors.username?.message}
              />
              <div className="mb-2"></div>
              <FloatInput
                Icon={KeyIcon}
                type="password"
                id="password"
                label="Kata Sandi"
                {...register("password")}
                isError={errors.password}
                errorMessage={errors.password?.message}
              />
              {isError && (
                <>
                  <div className="mb-2"></div>
                  <div
                    className="p-1 text-xs rounded-full bg-red-300 items-center text-gray-800 leading-none lg:rounded-full flex lg:inline-flex"
                    role="alert">
                    <span className="flex mr-3">
                      <XCircleIcon className="w-5 text-red-500" />
                    </span>
                    <span className="font-semibold mr-2 text-left flex-auto">
                      {errorMessage}
                    </span>
                    <svg
                      className="fill-current opacity-75 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20">
                      <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
                    </svg>
                  </div>
                </>
              )}
              <div className="mb-6"></div>
              <ButtonPrimary
                loading={isFetching}
                className="w-full"
                type="submit">
                Continue
              </ButtonPrimary>
              <div className="flex justify-between mt-4 mb-1">
                <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">
                  Forgot Password ?
                </span>

                <Link to={"/register"} rel="noopener noreferrer">
                  <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">
                    Don't have an account yet?
                  </span>
                </Link>
              </div>
              <div className="grid gap-3">
                {loginSocials.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]">
                    <img
                      className="flex-shrink-0"
                      src={item.icon}
                      alt={item.name}
                    />
                    <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                      {item.name}
                    </h3>
                  </a>
                ))}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
