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

        $memoryScore = $data->memoryScore;
        $avgResponseTime = $data->avgResponseTime;

        $memoryScoreClassical = $data->memoryScoreClassical;
        $avgResponseTimeClassical = $data->avgResponseTimeClassical;

        error_log($memoryScoreClassical);
        error_log($avgResponseTimeClassical);

        $memoryScorePop = $data->memoryScorePop;
        $avgResponseTimePop = $data->avgResponseTimePop;

        $memoryScoreHiphop = $data->memoryScoreHiphop;
        $avgResponseTimeHiphop = $data->avgResponseTimeHiphop;

        try
        {
            $db = new PDO('mysql:host=localhost;dbname=anpeca_petersenyszyn_surveyproject;charset=utf8mb4', 'anpeca_peter', '');
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $query = $db->prepare("UPDATE User SET graphicsMemoryScore= :graphicsMemoryScore, 
                                                   graphicsAvgResponseTime= :graphicsAvgResponseTime,
                                                   graphicsMemoryScoreClassical= :graphicsMemoryScoreClassical, 
                                                   graphicsAvgResponseTimeClassical= :graphicsAvgResponseTimeClassical,
                                                   graphicsMemoryScorePop= :graphicsMemoryScorePop, 
                                                   graphicsAvgResponseTimePop= :graphicsAvgResponseTimePop,
                                                   graphicsMemoryScoreHiphop= :graphicsMemoryScoreHiphop, 
                                                   graphicsAvgResponseTimeHiphop= :graphicsAvgResponseTimeHiphop
                                   WHERE randomId= :randomId");

            $query->execute(array(':graphicsMemoryScore' => $memoryScore, 
                                  ':graphicsAvgResponseTime' => $avgResponseTime, 
                                  ':graphicsMemoryScoreClassical' => $memoryScoreClassical, 
                                  ':graphicsAvgResponseTimeClassical' => $avgResponseTimeClassical, 
                                  ':graphicsMemoryScorePop' => $memoryScorePop, 
                                  ':graphicsAvgResponseTimePop' => $avgResponseTimePop, 
                                  ':graphicsMemoryScoreHiphop' => $memoryScoreHiphop,
                                  ':graphicsAvgResponseTimeHiphop' => $avgResponseTimeHiphop, 
                                  ':randomId' => $randomId));

            error_log("Successfully updated user!");

            echo "0";
        }

        catch(PDOException $e)
        {
            error_log("Could not successfully update user!");
            error_log($e->getMessage());
        }

        unset($db, $query);
    }
?>
