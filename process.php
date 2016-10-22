<?


//Retrieve form data.
//GET - user submitted data using AJAX
//POST - in case user does not support javascript, we'll use POST instead
$name = ($_GET['name']) ? $_GET['name']	 : $_POST['name'];
$email = ($_GET['email']) ?$_GET['email'] : $_POST['email'];
$phone_number = ($_GET['phone_number']) ?$_GET['phone_number'] : $_POST['phone_number'];
$comment = ($_GET['comment']) ?$_GET['comment'] : $_POST['comment'];

//flag to indicate which method it uses. If POST set it to 1
if ($_POST) $post=1;

//Simple server side validation for POST data, of course, you should validate the email
if (!$name) $errors[count($errors)] = 'Please enter your name.';
if (!$email) $errors[count($errors)] = 'Please enter your email.';
if (!$comment) $errors[count($errors)] = 'Please enter your comment.';
if (!$phone_number) $errors[count($errors)] = 'Please enter your phone number.';

$subject = 'Comment from ' . $name;
$message = '
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head></head>
<body>
<table>
    <tr><td>Name</td><td>' . $name . '</td></tr>
    <tr><td>Email</td><td>' . $email . '</td></tr>
    <tr><td>Phone Number</td><td>' . $phone_number . '</td></tr>
    <tr><td>Comment</td><td>' . nl2br($comment) . '</td></tr>
</table>
</body>
</html>';


// пример использования
require_once "SendMailSmtpClass.php"; // подключаем класс

$mailSMTP = new SendMailSmtpClass('olivka-tlt.no-reply@mail.ru', 'Ssirius1', 'ssl://smtp.mail.ru', 'Olivka Restaurant', 465); // создаем экземпляр класса
// $mailSMTP = new SendMailSmtpClass('логин', 'пароль', 'хост', 'имя отправителя');

// заголовок письма
$headers= "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=utf-8\r\n"; // кодировка письма
$headers .= "From: Olivka Restaurant <olivka-tlt.no-reply@mail.ru>\r\n"; // от кого письмо !!! тут e-mail, через который происходит авторизация
$result =  $mailSMTP->send('olivka-tlt@mail.ru', $subject, $message, $headers); // отправляем письмо
// $result =  $mailSMTP->send('Кому письмо', 'Тема письма', 'Текст письма', 'Заголовки письма');
//if($result === true){
//    return 1;
//}else{
//    return 0;
//}

return 1;

?>