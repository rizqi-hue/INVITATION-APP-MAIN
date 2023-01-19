import { useAppDispatch, useAppSelector } from "app/hooks";
import { FC, useEffect } from "react";
import { svg_desktop_login } from "../../../components";
import { profile } from "../services/UserSlice";

export interface PageProfileProps {
  className?: string;
}

const Profile: FC<PageProfileProps> = ({ className = "" }) => {
  const dispatch = useAppDispatch();
  const { isError} = useAppSelector(
    (state) => state.user
  );

  useEffect(() => {
    async function getProfile() {
      await dispatch(profile({}));
    }

    getProfile();

    if (isError) {
      // dispatch(clearState({}));
      // return navigate("/login");
    }
  }, [isError, dispatch]);

  return (
    <div className={`nc-PageProfile ${className}`} data-nc-id="PageProfile">
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
            <div className="bg-white rounded-md shadow-2xl p-5">
              <h1 className="text-gray-600 font-bold text-2xl">
                Selamat Datang
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
