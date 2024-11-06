"use client"

import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Política de Privacidade e Proteção de Dados</h2>
      <p className="text-gray-600 mb-2">
        Em respeito à Lei Geral de Proteção de Dados (LGPD), queremos garantir que todos os dados pessoais coletados em nosso aplicativo serão tratados com a máxima segurança e transparência. Sua privacidade é nossa prioridade.
      </p>
      
      <h3 className="text-xl font-semibold text-gray-800 mt-4">Compromissos com a Segurança dos Dados</h3>
      <ul className="list-disc list-inside text-gray-600 mb-4">
        <li><strong>Não Armazenamento:</strong> Informamos que os dados que você insere em nosso aplicativo não serão armazenados em nossos servidores. Eles são processados temporariamente para gerar o link desejado e, em seguida, descartados.</li>
        <li><strong>Segurança na Navegação:</strong> Tomamos medidas para garantir que a transmissão de dados ocorra de forma segura, utilizando protocolos de segurança adequados.</li>
        <li><strong>Transparência:</strong> Você pode usar nosso aplicativo com a confiança de que suas informações não serão retidas ou utilizadas para outros fins.</li>
      </ul>

      <h3 className="text-xl font-semibold text-gray-800 mt-4">Mini Guia: Usando o Aplicativo com Segurança</h3>
      <ul className="list-disc list-inside text-gray-600 mb-4">
        <li>Revise Nossas Políticas: Verifique nossa Política de Privacidade, onde detalhamos a forma como operamos.</li>
        <li>Não Compartilhe Informações Sensíveis: Evite inserir dados pessoais desnecessários.</li>
        <li>Verifique Links Gerados: Sempre tenha cuidado ao clicar em links, mesmo que gerados pelo nosso aplicativo.</li>
        <li>Entre em Contato Conosco: Se tiver dúvidas sobre o uso do aplicativo, entre em contato. Estamos aqui para ajudar!</li>
      </ul>

      <p className="text-gray-600">
        Agradecemos pela sua confiança em nosso aplicativo. Sua segurança e privacidade são fundamentais para nós.
      </p>
    </div>
  );
};

export default PrivacyPolicy;