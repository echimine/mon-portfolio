<?php
require_once('../vendor/autoload.php');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Mot de passe de l'email
$mdp = $_ENV["MDP_MAIL"];
$identifiant = $_ENV["Email"];
// Récupérer les données JSON envoyées
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (isset($data['formulaire'])) {
    $formulaire = $data['formulaire'];

    foreach ($formulaire as $entry) {
        $nom = $entry['nom'];
        $prenom = $entry['prenom'];
        $email = $entry['email'];
        $object = $entry['object'];
        $message = $entry['message'];

        try {
            // Création de l'instance PHPMailer
            $mailer = new PHPMailer(true);
            $mailer->CharSet = 'UTF-8';

            // Configuration du serveur SMTP
            $mailer->isSMTP();
            $mailer->SMTPAuth = true;
            $mailer->Host = 'ssl0.ovh.net';  
            $mailer->Port = 465;  
            $mailer->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            $mailer->Username = 'eliott.chiminello@echimine.fr';
            $mailer->Password = $mdp;

            // Informations de l'expéditeur et du destinataire
            $mailer->setFrom('news@echimine.fr', "CONTACT E-CHIMINE");
            $mailer->addAddress('eliott.chiminello@echimine.fr');

            // Contenu du message
            $mailer->isHTML(true);
            $mailer->Subject = 'Une personne est entrée en contact sur le site internet';
            $mailer->Body = "
                <p><strong>Nom :</strong> $nom</p>
                <p><strong>Prénom :</strong> $prenom</p>
                <p><strong>Objet :</strong> $object</p>
                <p><strong>Message :</strong> $message</p>
                <p><strong>Email :</strong> <a href='mailto:$email'>$email</a></p>
            ";

            // Débogage SMTP
            $mailer->SMTPDebug = SMTP::DEBUG_SERVER;
            $mailer->Debugoutput = function($str, $level) { echo "Débogage: $str\n"; };

            // Envoi de l'email
            if (!$mailer->send()) {
                echo "Erreur lors de l'envoi du message. Erreur: " . $mailer->ErrorInfo;
            } else {
                echo "Message envoyé avec succès.";
            }

        } catch (Exception $e) {
            echo "Mailer Error: " . $e->getMessage();
        }
    }
} else {
    echo "Aucune donnée formulaire reçue";
}
?>
