<?php

require_once("/opt/www/photos/connect.php");
require_once("/opt/www/photos/class/photo.php");
require_once("/opt/www/photos/class/user.php");
require_once("/opt/www/photos/class/bibliotheque.php");
require_once('/opt/www/photos/class/dao.php');
require_once("/opt/www/photos/commun.php");
require_once("/opt/www/photos/config.php");
require_once("/opt/www/photos/class/Exception.php");
require_once('/opt/www/photos/class/PHPMailer.php');
require_once('/opt/www/photos/class/SMTP.php');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


$objDao = new Dao();

try
{
	$listeBibliotheques = $objDao->getListeBibliotheques();
	//$listePhotos = $objDao->getListePhotosASupprimerVeille(1);
}
catch(PDOException $e)
{
	echo "Impossible de récupérer la liste des bilbiothèques : " . $e->getMessage();
}

foreach($listeBibliotheques as $bibliotheque)
{
	$idBibliotheque = $bibliotheque->getIdBibliotheque();
	$nomBibliotheque = $bibliotheque->getNom();
	
	try
	{
		$listePhotos = $objDao->getListePhotosASupprimerVeille($idBibliotheque);
		echo "Traitement de la bibliothèque $nomBibliotheque => ". count($listePhotos) . " photo(s) à supprimer.\n";
		$corpsMessage = "<p>Bonjour,<br>Vous êtes administrateur de la bibliothèque $nomBibliotheque.<br>Nous vous informons que les images ci-dessous sont en attente de suppression. La suppression définitive interviendra demain.</p>";
		$css1="<link href='" . URL_SITE . "/css/bootstrap.min.css' rel='stylesheet'>";
		$css2 = "<link rel='stylesheet' href='" . URL_SITE . "/css/style.css'>";

		$message = "<html charset='utf-8'><head><title>Logiciel photos</title><meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui'>$css1 $css2</head><body>$corpsMessage";


		$tableau = "<div class='row row-cols-1 row-cols-md-5'>";

		foreach ($listePhotos as $photo) 
		{
			$dateCreate = date("d/m/Y H:i:s",strtotime($photo->getDateCreate()));

			$dateSuppression = date("d/m/Y",strtotime($photo->getDateSuppression()));
			$nom = substr($photo->getNom(),0,20);
			$description = $photo->getDescription();
			$thumbPath = $photo->getThumbPath();
			$fullPath = $photo->getFullPath();
			$ouverture = $photo->getOuverture();
			$width = $photo->getWidth();
			$height = $photo->getHeight();
			$exposition = $photo->getExposition();

			$vignette = "<div class='card vignette' style='width: 18rem;'>" .
						"<div class='card-header text-center bg-warning'>$nom</div>" .
						"<img src='" . URL_SITE . "/$thumbPath' class='card-img-top'>" .
						"<div class='card-body'>" .				
						"<p class='card-text'><b>Dimensions :</b> $width x $height pixels<br>" .
						"<b>Ouverture :</b> f/$ouverture<br>" .
						"<b>Durée d'exposition :</b> $exposition sec.<br>" .
						"<b>Description :</b> $description</p>" .
						"</div><div class='card-footer text-center'>$dateCreate</div>" . 
						"</div>";

			$tableau = $tableau . $vignette;

		}


		$message = $message . $tableau . "</div></body></html>";

		$subject = "Suppression des photos de votre bibliothèque";



		 // Envoi
		if(count($listePhotos)>=1)
		{
			try
			{
				$listeUsers = $objDao->getListeAdminsByBibliotheque($idBibliotheque);
				foreach($listeUsers as $tmp)
				{
					$email = $tmp->getMail();
					//Si l'administrateur n'a pas de mail de renseigner on envoie à l'administrateur de l'application
					if($email != null or $email != "")
					{
						$to = $email;
					}
					else
					{
						$to = MAIL_ADMIN;
					}
				}

				//Si pas d'administrateur, on envoie à l'administrateur de l'application
				if(count($listeUsers)==0)
				{
					$to = MAIL_ADMIN;
				}

				// Préparation du mail
				$mail = new PHPMailer(true);
				$mail->CharSet = "UTF-8";
				//$mail->Encoding = 'base64';

				try {
				    //Server settings
				    //$mail->SMTPDebug = SMTP::DEBUG_SERVER;
				    $mail->isSMTP();
				    $mail->Host       = 'srv-wazuh.servers.pri'; // Adresse du serveur de messagerie : OVH = ssl0.ovh.net
				    $mail->SMTPAuth   = false; // Indique si une authentification est utilisée : OVH = true
				    $mail->SMTPSecure = false;           
				    $mail->SMTPAutoTLS = false; // A tester avec ovh
				    $mail->Port       = 25; // OVH = 465

				    //Recipients
				    $mail->setFrom('contact@zoran.xyz', 'LOGICIEL PHOTOS'); // Emmeteur du message
				    $mail->addAddress($to, '');// $to = Destinataire du mail

				    //Content
				    $mail->isHTML(true); // true = Message au format html; false = message en mode texte
				    $mail->Subject = $subject;
				    $mail->Body    = $message;
				    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

				    $mail->send(); // Envoie du message
				    echo 'Message has been sent';
				} catch (Exception $e) {
				    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
				}



















				
			}
			catch(PDOException $e)
			{
				echo "Impossible de récupérer les administrateurs pour la bibliothèque $nomBibliotheque : " . $e->getMessage();
			}
			

			
		}
		 


	}
	catch(PDOException $e)
	{
		echo "Impossible de récupérer la liste des photos pour la bibliothèque $nomBibliotheque : " . $e->getMessage();
	}




}



?>