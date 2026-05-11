import { useState } from 'react';
import { useAuth } from '../../../controllers/hooks/useAuth';

//import { createUser } from '../../../../../Backend/controllers/userController';

export function useRegisterLogic() {
  //const newUser = createUser();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { register, loading, error } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'confirmPassword' || e.target.name === 'password') {
      setPasswordError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
      return;
    }
    register(formData);
  };

  return {
    formData,
    passwordError,
    showPassword,
    setShowPassword,
    loading,
    error,
    handleChange,
    handleSubmit
  };
}
