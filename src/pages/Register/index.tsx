import configs from '@configs/index';
import images from '@shared/assets/images';
import Button from '@shared/components/Button';
import { userLoginSucess } from '@redux/userSlice';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Register() {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [school, setSchool] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [error, setError] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const forms = [
    {
      title: 'Số điện thoại',
      placeholder: 'Số điện thoại của bạn',
      img: images.form_input,
      handelChange: (e: any) => {
        const value = checkInput(e);
        setPhone(value);
      },
    },
    {
      title: 'Họ và tên',
      placeholder: 'Tên của bạn',
      img: images.form_input,
      handelChange: (e: any) => {
        const value = checkInput(e);
        setName(value);
      },
    },
    {
      title: 'Email',
      placeholder: 'Địa chỉ email',
      img: images.form_input,
      handelChange: (e: any) => {
        const value = checkInput(e);
        setEmail(value);
      },
    },

    {
      title: 'Trường THPT',
      placeholder: 'Tên trường',
      img: images.form_input,
      handelChange: (e: any) => {
        const value = checkInput(e);
        setSchool(value);
      },
    },
  ];
  const checkInput = (e: any) => {
    let value: string = e.target.value;
    if (value.startsWith(' ')) value = '';
    return value;
  };
  function validateData(data: any) {
    setError(true);
    const phoneRegex = /^(0[1-9])+([0-9]{8})\b/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(vn|com\.vn|com)$/;
    if (!phoneRegex.test(data.phone)) {
      setErrorMsg('Số điện thoại của bạn không hợp lệ');
      return;
    }
    if (data.name.length === 0) {
      setErrorMsg('Tên của bạn không được để trống');
      return;
    }
    if (!emailRegex.test(data.email)) {
      setErrorMsg('Địa chỉ email không hợp lệ');
      return;
    }
    setErrorMsg('');
    setError(false);
  }
  function handleSummit() {
    const data = {
      phone,
      name,
      email,
      school,
    };
    validateData(data);
  }

  useEffect(() => {
    const handelSignIn = async () => {
      setLoading(true);
      const res = await axios.post(configs.api.register, {
        phone,
        name,
        email,
        school,
      });
      dispath(userLoginSucess(res.data.data));
      navigate(configs.routes.choiceJob);
      setLoading(false);
    };
    if (!error && errorMsg.length === 0) {
      handelSignIn();
    }
  }, [error, errorMsg]);

  return (
    <div className="appearance pt-2 h-full w-full flex flex-col items-center justify-between">
      <div className="relative flex flex-col items-center justify-center portrait:h-full portrait:w-full landscape:w-full landscape:h-full">
        <img
          className="absolute z-10 portrait:hidden landscape:w-1/5 landscape:bottom-5 landscape:left-5 landscape:translate-x-10"
          src={images.bee8}
          alt=""
        />
        <div className="aprrearance relative portrait:h-fit portrait:w-full landscape:h-[90%] landscape:w-[55%] flex flex-col items-center justify-center">
          <header className="relative z-10 portrait:w-[90%] portrait:h-1/6 landscape:w-1/2 landscape:h-1/5 landscape:scale-125">
            <img
              className="w-full object-contain"
              src={images.text_bee}
              alt=""
            />
          </header>
          <main className="relative flex-1 portrait:w-[90%] landscape:w-[100%] landscape:translate-y-[-5%] landscape:scale-90 landscape:p-2 ">
            <img
              className="absolute z-0 w-full h-full"
              src={images.more_box}
              alt=""
            />
            <div className="relative z-10 landscape:my-2 p-1 flex flex-col w-full h-full items-center justify-center">
              <header className="portrait:h-[20%] landscape:h-[10%] landscape:mb-5 flex items-center justify-center font-bold text-lg">
                TẠO TÀI KHOẢN
              </header>
              <main className="relative py-2 px-[10%] min-h-[40vh] flex-1 w-full landscape:flex landscape:flex-col">
                <div className="h-fit landscape:grid landscape:grid-cols-2 gap-2">
                  {forms.map((item, idx) => (
                    <div key={idx} className="h-fit">
                      <p className="mb-1">{item.title}</p>
                      <input
                        type="text"
                        className="px-2 w-full h-8 bg-[#FFF694] rounded-lg"
                        placeholder={item.placeholder}
                        onChange={(e) => item.handelChange(e)}
                      />
                    </div>
                  ))}
                </div>
                <p className="my-1 h-8 flex items-center text-red-500 font-bold">
                  {error && errorMsg.length > 0 && <>Lỗi: {errorMsg}</>}
                </p>
                <div className="absolute bottom-0 right-0 left-0 portrait:w-full portrait:flex portrait:justify-between landscape:flex landscape:justify-between landscape:translate-y-1/2">
                  <Button>Quay lại</Button>
                  {loading ? (
                    <Button>Đang tải</Button>
                  ) : (
                    <Button onClick={handleSummit}>Vào game</Button>
                  )}
                </div>
              </main>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Register;
