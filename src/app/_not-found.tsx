// pages/_not-found.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const NotFoundRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/404'); // Redireciona para a página 404 padrão
  }, [router]);

  return null; // Não renderiza nada
};

export default NotFoundRedirect;
