<?php


function is_ie(){
    if (isset($_SERVER['HTTP_USER_AGENT']) &&  (strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE') !== false)) {
        return true;
    }
    else{
       return false;
    }
}

if(is_ie()){
    //var_dump($_FILES);
    print '{"this":"is", "iframe":"submit"}';
}
else{
    //var_dump($_POST);
    print '{"this":"is", "ajax":"submit"}';
}







 ?>