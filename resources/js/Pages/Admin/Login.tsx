import AdminLoginForm from '@/Components/Admin/Login/AdminLoginForm';
import AdminLoginTitle from '@/Components/Admin/Login/AdminLoginTitle';
import LoginContainer from '@/Components/Admin/Login/LoginContainer';
import { useForm } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

export default function Login() {
    //Local state
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(route('admin.login.submit'));
    };

    return (
        <LoginContainer>
            <AdminLoginTitle />
            <AdminLoginForm
                submit={submit}
                data={data}
                errors={errors}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                setData={setData}
                processing={processing}
            />
        </LoginContainer>
    );
}
