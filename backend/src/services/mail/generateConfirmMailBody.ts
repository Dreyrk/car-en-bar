import jwt from 'jsonwebtoken';

function generateConfirmMailBody(id: number, username?: string) {
  const token = jwt.sign({ id }, process.env.JWT_PRIVATE_KEY as string, { expiresIn: '7d' });
  return `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Confirmation d'Email</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    color: #333;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 50px auto;
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    padding-bottom: 20px;
                    border-bottom: 1px solid #ddd;
                }
                .content {
                    padding: 20px 0;
                }
                .footer {
                    text-align: center;
                    padding-top: 20px;
                    border-top: 1px solid #ddd;
                    font-size: 12px;
                    color: #777;
                }
                
                .btn {
                    appearance: button;
                    backface-visibility: hidden;
                    background-color: #405cf5;
                    border-radius: 6px;
                    border-width: 0;
                    box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset,rgba(50, 50, 93, .1) 0 2px 5px 0,rgba(0, 0, 0, .07) 0 1px 1px 0;
                    box-sizing: border-box;
                    color: #fff;
                    cursor: pointer;
                    font-family: -apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif;
                    font-size: 100%;
                    height: 44px;
                    line-height: 1.15;
                    margin: 12px 0 0;
                    outline: none;
                    overflow: hidden;
                    padding: 0 25px;
                    position: relative;
                    text-align: center;
                    text-transform: none;
                    transform: translateZ(0);
                    transition: all .2s,box-shadow .08s ease-in;
                    user-select: none;
                    -webkit-user-select: none;
                    touch-action: manipulation;
                    padding: 6px 10px
                    width: 100%;
                } 
                .btn:focus {
                    box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset, rgba(50, 50, 93, .2) 0 6px 15px 0, rgba(0, 0, 0, .1) 0 2px 2px 0, rgba(50, 151, 211, .3) 0 0 0 4px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Confirmation d'Email</h1>
                </div>
                <div class="content">
                    <p>Bonjour ${username || 'Unknown'},</p>
                    <p>Merci de vous être inscrit(e) sur Car-en-bar. Pour finaliser votre inscription et commencer à utiliser notre service, nous avons besoin que vous confirmiez votre adresse email.</p>
                    <p>
                        <a href="${process.env.CLIENT_URL || 'http://localhost:3000'}/email/confirmation?token=${token}" class="btn">Confirmer mon adresse email</a>
                    </p>
                    <p>Si le lien ci-dessus ne fonctionne pas, copiez et collez l'URL suivante dans votre navigateur :</p>
                    <p>${process.env.CLIENT_URL || 'http://localhost:3000'}/email/confirmation?token=${token}</p>
                    <p>Si vous n'avez pas créé de compte sur Car-en-bar, veuillez ignorer cet email.</p>
                    <p>Nous vous remercions pour votre confiance et nous sommes impatients de vous voir bientôt sur Car-en-bar.</p>
                </div>
                <div class="footer">
                    <p>L'équipe Car-en-bar</p>
                </div>
            </div>
        </body>
        </html>
    `;
}

export default generateConfirmMailBody;
