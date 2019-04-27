<?php
    ini_set("log_errors", 1);
    ini_set("error_log", "php-error.log");

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

    $data = json_decode(file_get_contents("php://input"));

    if (isset($data))
    {
        $randomId = $data->randomId;
        $score = $data->noMusicScore;
        $classicalScore = $data->classicalMusicScore;
        $popScore = $data->popMusicScore;
        $hiphopScore = $data->hiphopMusicScore;

        try
        {
            $db = new PDO('mysql:host=localhost;dbname=anpeca_petersenyszyn_surveyproject;charset=utf8mb4', 'anpeca_peter', '');
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $query = $db->prepare("INSERT INTO User (randomId, score, classicalScore, popScore, hiphopScore) 
                                   VALUES (:randomId, :score, :classical, :pop, :hiphop)");

            $query->execute(array(':randomId' => $randomId, ':score' => $score, ':classical' => $classicalScore, 
                                  ':pop' => $popScore, ':hiphop' => $hiphopScore));

            error_log("Successfully added user!");

            echo "0";
        }

        catch(PDOException $e)
        {
            error_log("Could not successfully add user!");
            error_log($e->getMessage());
        }

        unset($db, $query);
    }
?>
