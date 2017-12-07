<?php

// Handle Post
if (count($_POST))
{
    // Parse login.txt
    $loginData = file('login.txt');
    $accessData = array(); 
    foreach ($loginData as $line) {
        list($username, $password) = explode(',', $line);
        $accessData[trim($username)] = trim($password);
    }

    // Parse form input
    $mid = isset($_POST['mid']) ? $_POST['mid'] : '';
    $mpassword = isset($_POST['mpassword']) ? $_POST['mpassword'] : '';

    // Check input versus login.txt data
    if (array_key_exists($mid, $accessData) && $mpassword == $accessData[$mid]) {
        $response = "<p class='green-text' Username and Password is correct";
    } else { 
        $response = "<p class='red-text' Invalid username and/or password";
    }
}

?>

<!DOCTYPE html>
  <html>
    <title>CS389 Group 7</title>

    <head>
      <!--Import Google Icon Font-->
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <!--Import materialize.css-->
      <link type="text/css" rel="stylesheet" href="css/index.css"  media="screen,projection"/>
      <link type="text/css" rel="stylesheet" href="css/materialize.css"  media="screen,projection"/>
      <script src="https://use.fontawesome.com/c124753d69.js"></script>

      <!--Let browser know website is optimized for mobile-->
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <style>
      .card-image{
        width:100%;
      }
      </style>


      
    </head>


    <body background="https://wallpaperscraft.com/image/stripes_vertical_shadow_color_50464_1920x1200.jpg" div="black" style="background-repeat:no-repeat;background-size:cover;">


    <script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
      <script type="text/javascript" src="js/materialize.js"></script>
      <script type="text/javascript" src="init.js"></script>
<div class="page-flexbox-wrapper">

      <header>
      <nav>
          <div class="nav-wrapper  cyan darken-1">
            <ul id="nav-mobile" class="left">
            <a href="#" class="brand-logo flow-text center">CyberSec</a>
            <a href="#" data-activates="slide-out" class=" show-on-medium-and-up button-collapse waves-effect waves-light cyan left"><i class="material-icons left">menu</i>Menu</a>


            <ul id="slide-out" class="side-nav blue-grey darken-3">
              <li><div class="user-view"></div></li>
              <div class="background"></div>
                <li><a  class="white-text" href="#!">CyberSec Home (Not Here Yet)</a></li>
                <li><div class="divider"></div></li>
                <ul class="collapsible" data-collapsible="accordion">
                <li>
                  <div class="collapsible-header"><i class="fa fa-microchip fa-3x"></i>Problems</div>
                    <div class="collapsible-body  blue-grey darken-3">
                      <span><a href="index.html">Problem 1</a></span>
                    </div>
                    <div class="collapsible-body  blue-grey darken-3">
                      <span><a href="phppass.php">Problem 2</a></span>
                    </div>
                    <div class="collapsible-body  blue-grey darken-3">
                      <span><a href="hashes.php">Problem 3</a></span>
                    </div>
                </li>
            </ul>
            </li>
            </ul>

          </div>
          </nav>
          </header>
      <main>
        <div class="row">
        <div class="col l4 m6 s12 offset-l4">

          <div class="card hoverable">
            <div class="card-content">
              <span class="card-title black-text center-align ">Login 2:</span>\
              <?$response?></p>
                 <p>This one won't be as easy. We have figured out how to store user information in a text file on this website. Let's see what you can do! (Medium)</p><br>
                <form id="regform" method="post" action="">

        <p>Username:<input type="text" name="mid" required="required" /></p>
        <p>Password:<input type="password" name="mpassword" required="required" /></p>
        <input class="waves-effect waves-light btn" type="submit" value="Log in" onclick="isValid();">
    </form>

              </div>
            </div>
          </div>





        </div>


      </main>

      <footer>
            <div class="col l4 offset-l2 s12">
                <div class="footer-copyright cyan darken-3">
                    <div class="container center">
                     &copy; Dalton Haselgrove, Jeffrey Sutherland, Max Pichardo 2017
                    </div>
                </div>
            </div>
      </footer>
</div>
    </body>
  </html>
~                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
~                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
~                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
~                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
~                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
~                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
~                                       