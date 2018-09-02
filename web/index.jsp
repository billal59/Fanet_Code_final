<html>
    <meta charset="utf-8">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="icon" href="https://www.codexworld.com/wp-content/uploads/2014/09/favicon.ico" type="image/x-icon" />
        <meta name="description" content="Live Demo at CodexWorld - Autocomplete Location Search using Google Maps JavaScript API and jQuery by CodexWorld">
        <meta name="keywords" content="demo, codexworld demo, project demo, live demo, tutorials, programming, coding">
        <meta name="author" content="CodexWorld">
        <title>Live Demo - Autocomplete Location Search using Google Maps JavaScript API and jQuery by CodexWorld</title>
        <!-- Bootstrap core CSS -->
        <link href="http://demos.codexworld.com/includes/css/bootstrap.css" rel="stylesheet">
        <!-- Add custom CSS here -->
        <link href="http://demos.codexworld.com/includes/css/style.css" rel="stylesheet">
        <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
        <style type="text/css">
            #geomap {
                width: 100%;
                height: 380px;
            }
            ul#geoData {
                text-align: left;
                font-weight: bold;
                margin-top: 10px;
            }
            ul#geoData span {
                font-weight: normal;
            }
        </style>
        <script src="js/mapjs.js"></script>
        <script src="js/displayRoute.js"></script>
    </head>
    <body>
        <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div class="container">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <a class="navbar-brand" href="index.jsp">
                        <span style="color:red">Fanet In Cloud</span>
                    </a>
                </div>

                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav navbar-right">
                        <li>
                            <span style="color:#ff00cc">Thesis Done BY Billal And Sahjahan</span>
                        </li>
                    </ul>
                </div>
                <!-- /.navbar-collapse -->
            </div>
        </nav>

        <div class="container">
            <div class="row">
                <div class="col-sm">
                    <div class="div-center">
                        <span class="align-text-top"><h4>Search Location</h4></span>
                        <!-- search input box -->

                        <div class="form-group input-group">
                            <div class="row">
                                <div class="col-xs-3">
                                <input type="text" id="start" class="form-control" placeholder="Source Address"> <br>
                                <input type="text" id="end" class="form-control" placeholder="Destination Address">
                                </div>
                                <div class="col-xs-3"> 
                                 <input type="text" id="start" class="form-control" placeholder="Source Address"> 
                                <input type="text" id="end" class="form-control" placeholder="Destination Address">
                                </div>
                                <div class="col-xs-3"> 
                                 <input type="text" id="start" class="form-control" placeholder="Source Address"> 
                                <input type="text" id="end" class="form-control" placeholder="Destination Address">
                                </div>
                                <div class="col-xs-3"> 
                                 <input type="text" id="start" class="form-control" placeholder="Source Address"> 
                                <input type="text" id="end" class="form-control" placeholder="Destination Address">
                                </div>
                            </div>
                            <div class="input-group-btn">
                                <button class="btn btn-default get_map" onClick="displayRoute();">
                                    Locate
                                </button>
                            </div>
                        </div> 
                        <div id="infoSrc-content">
                            <img src="" width="16" height="16" id="place-icon">
                            <span id="place-name"  class="title"></span><br>
                            <span id="place-address"></span>
                        </div>

                        <div id="infoDest-content">
                            <img src="" width="16" height="16" id="place-icon">
                            <span id="place-name"  class="title"></span><br>
                            <span id="place-address"></span>
                        </div>


                    </div>
                </div>
                <div class="col-sm">    
                    <!-- display google map -->
                    <div id="geomap"></div>                     
                </div>
            </div>
        </div> 
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
        <script src="http://demos.codexworld.com/includes/js/bootstrap.js"></script>
        <!-- Place this tag in your head or just before your close body tag. -->
        <script src="https://apis.google.com/js/platform.js" async defer></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
        <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD8pZxUOR0h2lo_uHZx4-JbryPEjf7zm1E&libraries=places&callback=initMap"></script>

    </body>
</html>
