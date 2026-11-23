# Nosso calendário do Advento 2026

O site é composto pelo HTML em `public/index.html` e pelas funções de servidor em `api/`. A Vercel publica somente `public/` como conteúdo estático. As fotos entram no pacote da função, que verifica o dia em America/Sao_Paulo antes de enviar uma imagem. Não mova a pasta `fotos/` para `public/`.

## Publicação

- Framework Preset: Other.
- Root Directory: raiz do repositório.
- Output Directory: `public` (já configurado em `vercel.json`).
- Não é necessário instalar dependências nem configurar token do GitHub.
- Mantenha o repositório **privado**: um repositório público permite ler as fotos pelo próprio GitHub, independentemente do bloqueio do site.

## Fotos e mensagens

A pasta `fotos/` aceita `01.jpg` até `31.jpg`, assim como extensões JPEG, PNG ou WEBP, inclusive em maiúsculas. Para personalizar legendas, adicione, opcionalmente, `legendas/01.json` etc. com os campos `caption` e `alt`.

O histórico de janelinhas abertas fica no navegador do visitante. Ao mudar de dispositivo, as datas continuam corretas, mas o histórico de abertura não é sincronizado.
