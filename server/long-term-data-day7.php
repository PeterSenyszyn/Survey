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
                <td>Music genre</td>
                <td>Question 1 correct</td>
                <td>Question 2 correct</td>
                <td>Question 3 correct</td>
                <td>Question 4 correct</td>
                <td>Question 5 correct</td>
                <td>Question 6 correct</td>
                <td>Question 7 correct</td>
                <td>Question 8 correct</td>
                <td>Question 9 correct</td>
                <td>Question 10 correct</td>
            </tr>

            <?php
                ini_set("log_errors", 1);
                ini_set("error_log", "php-error.log");

                try
                {
                    $db = new PDO('mysql:host=localhost;dbname=anpeca_petersenyszyn_surveyproject;charset=utf8mb4', 'anpeca_peter', 'abc154110!');
                    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                    $query = $db->prepare("SELECT * FROM UserLongTerm");
                    $query->execute();

                    $rows = $query->fetchAll(PDO::FETCH_ASSOC);

                    foreach($rows as $row)
                    {
                        $musicGenre = $row['musicGenre'];
                        $answersCorrect = str_split($row['answersCorrectDay7']);

                        echo "<tr>";

                        echo "<td>" . $musicGenre . "</td>";

                        for ($i = 0; $i < 10; $i++)
                        {
                            echo "<td>" . $answersCorrect[$i] . "</td>";

                            error_log($answersCorrect[$i]);
                        }

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