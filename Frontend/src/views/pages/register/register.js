import { useState } from 'react';
import { useAuth } from '../../../controllers/hooks/useAuth';

export function useRegisterLogic() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    rol: 'OPERARIO'
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
