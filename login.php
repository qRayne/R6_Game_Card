<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="js/loginBackground.js"></script>
    <title>login</title>
    <link rel="stylesheet" href="Css/global.css">
</head>

<body class="background" style="background-image: url('images/nokk.jpg'); background-repeat: no-repeat; background-size: cover; background-attachment: fixed;">

    <div class="form-style-6">
        <form action=login.html method="post">
            <input type="text" name="username" placeholder="Username" />
            <input type="password" name="password" placeholder="Password" />
            <input type="submit" name="button" value="Register"/>
        </form>
    </div>

    <div class="dropdown">
        <button onclick="myFunction()" class="dropbtn">Agents</button>
        <div id="myDropdown" class="dropdown-content">
            <a onclick="Background_nokk()" href="#Nokk">Nokk</a>
            <a onclick="Background_lion()" href="#Lion">Lion</a>
            <a onclick="Background_buck()" href="#Buck">Buck</a>
            <a onclick="Background_maverick()" href="#Maverick">Maverick</a>
        </div>
    </div>

</body>

</html>