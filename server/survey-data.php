<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js" type="text/javascript"></script>
        <style type="text/css">
            tr.header
            {
                font-weight:bold;
            }
            tr.alt
            {
                background-color: #777777;
            }
        </style>
        <script type="text/javascript">
            $(document).ready(function(){
               $('.striped tr:even').addClass('alt');
            });
        </script>
        <title></title>
    </head>

    <body>
        <table class="striped">
            <tr class="header">
                <td>Text - No Music Score</td>
                <td>Text - Classical Score</td>
                <td>Text - Pop Score</td>
                <td>Text - Hip Hop Score</td>
                <td>Graphical - No Music % right</td>
                <td>Graphical - No Music avg response time(ms)</td>
                <td>Graphical - Classical % right</td>
                <td>Graphical - Classical avg response time(ms)</td>
                <td>Graphical - Pop % right</td>
                <td>Graphical - Pop avg response time(ms)</td>
                <td>Graphical - Hiphop % right</td>
                <td>Graphical - Hiphop avg response time(ms)</td>
            </tr>

            <?php
                try
                {
                    $db = new PDO('mysql:host=localhost;dbname=anpeca_petersenyszyn_surveyproject;charset=utf8mb4', 'anpeca_peter', 'abc154110!');
                    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                    $query = $db->prepare("SELECT * FROM User");
                    $query->execute();

                    $rows = $query->fetchAll(PDO::FETCH_ASSOC);

                    foreach($rows as $row)
                    {
                        echo "<tr>";
                        echo "<td>".$row['score']."</td>";
                        echo "<td>".$row['classicalScore']."</td>";
                        echo "<td>".$row['popScore']."</td>";
                        echo "<td>".$row['hiphopScore']."</td>";
                        echo "<td>".$row['graphicsMemoryScore']."</td>";
                        echo "<td>".$row['graphicsAvgResponseTime']."</td>";
                        echo "<td>".$row['graphicsMemoryScoreClassical']."</td>";
                        echo "<td>".$row['graphicsAvgResponseTimeClassical']."</td>";
                        echo "<td>".$row['graphicsMemoryScorePop']."</td>";
                        echo "<td>".$row['graphicsAvgResponseTimePop']."</td>";
                        echo "<td>".$row['graphicsMemoryScoreHiphop']."</td>";
                        echo "<td>".$row['graphicsAvgResponseTimeHiphop']."</td>";
                        echo "</tr>";
                    }
                }

                catch(PDOException $e)
                {
                    error_log($e->getMessage());
                }

                unset($db, $query);
            ?>
        </table>
    </body>
</html>