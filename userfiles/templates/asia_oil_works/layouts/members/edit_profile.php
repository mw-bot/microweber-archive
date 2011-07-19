<!-- Secondary navigation -->
<? $form_values = get_user(); 

//p( $form_values);
?>
<script>
 
 function process_account_save(msg){
	// alert(msg);
	  
	 if(msg.error){
	 $errors = 'Error' + '\n';
		
			var err = msg.error;
			
			$.each(err, function(key, value) {
			$errors = $errors+ '\n' + value;
			});
			
			alert($errors);
			
	
	 } else {
		 //window.location.reload()
		 
		 
	 }
	  if(msg.success){
		 new Notification('<strong>You</strong> just saved <strong>your profile</strong>', 'saved');
		  
		  
	  }
	 
	 
 }
						
						
		
 
 </script>
 <script type="text/javascript">
	function ajaxFileUpload()
	{
		 
		$.ajaxFileUpload
		(
			{
				url:'<? print site_url('api/media/upload'); ?>',
				secureuri:false,
				fileElementId:'fileToUpload',
				dataType: 'json',
				data:{for:'table_users', id:'<? print user_id(); ?>'},
				success: function (data, status)
				{
					
					
					
					if(typeof(data.done) != 'undefined')
					{
						 
								
								$("#user_pic_holder").html('<img src="'+url+'" />');
								$("#user_pic_uploaded").val(url);
					}
					
						 
				} 
			}
		)
		
		return false;

	}
	</script>
    
    

<nav id="secondary">
  <ul>
    <li class="current"><a href="#maintab">Personal info</a></li>
    <li><a href="#secondtab">Username and password</a></li>
  </ul>
</nav>
<!-- The content -->
<section id="content_tabs">
  <div class="tab" id="maintab">
    <h2>Account details</h2>
    <form class="wymupdate" id="profile_data" onsubmit="mw.users.save('#profile_data', process_account_save); return false;">
      <div>
        <section>
          <label> Account type <small>- as <strong>"Job seeker"</strong> you can post your CV on jobs</small> <small>- as <strong>"Company"</strong> you can post jobs for the Job seekers</small> </label>
          <div>
            <select name="custom_field_type">
              <option value="job_seeker">Job seeker</option>
              <option value="company">Company</option>
            </select>
          </div>
        </section>
      </div>
      <div class="clear"></div>
      <div class="clear"></div>
      <br>
      <div>
        <section>
          <label for="address"> Names </label>
          <div> Please enter your <em>real</em> names.<br />
            <br />
            <input name="custom_field_first_name" id="address" placeholder="First name" value="<? print $form_values['custom_fields']['first_name'];  ?>" type="text" class="small" />
            <input placeholder="Last name" type="text" class="small" name="custom_field_last_name" value="<? print $form_values['custom_fields']['last_name'];  ?>" />
          </div>
        </section>
        <section>
          <label for="username"> Email* <small>Your email address must be valid</small> </label>
          <div>
            <input type="text" id="email" name="email"   class="required"  value="<? print $form_values['email'];  ?>" />
          </div>
        </section>
        <section>
          <label for="address"> Address </label>
          <div> Please enter your <em>current</em> address.<br />
            <br />
            <textarea class="required" id="textarea" name="custom_field_address"><? print $form_values['custom_fields']['address'];  ?></textarea>
          </div>
        </section>
        <section>
          <label for="address"> Phones </label>
          <div> Please enter your <em>current</em> phones.<br />
            <br />
            <input name="custom_field_first_phones" id="phones" placeholder="Your phone numbers" value="<? print $form_values['custom_fields']['phones'];  ?>" type="text"  />
          </div>
        </section>
        
        
        
         <section>
          <label for="address"> Names </label>
          <div> Please enter your <em>real</em> names.<br />
            <br />
            <input name="custom_field_first_name" id="address" placeholder="First name" value="<? print $form_values['custom_fields']['first_name'];  ?>" type="text" class="small" />
            <input placeholder="Last name" type="text" class="small" name="custom_field_last_name" value="<? print $form_values['custom_fields']['last_name'];  ?>" />
          </div>
        </section>
        
        
        
        
          <section>
          <label for="address"> Picture </label>
          <div> Please upload a picture of yourself.<br />
            <br />
            <div id="user_pic_holder"></div>
            <? print $form_values['custom_fields']['picture'];  ?>
            
                    <input id="fileToUpload" type="file"   name="fileToUpload" class="input" onchange="ajaxFileUpload();" onblur="ajaxFileUpload();">
                    
                    <button class="button" id="buttonUpload" onclick="return ajaxFileUpload();">Upload</button>
 <input name="custom_field_picture"  id="user_pic_uploaded" value="<? print $form_values['custom_fields']['picture'];  ?>" type="text"  />
            
           
          </div>
        </section>
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
      </div>
      <div class="clear"></div>
      <h2>Enter something about yourself (free text)</h2>
      <textarea    name="custom_field_info"><? print $form_values['custom_fields']['info'];  ?></textarea>
      <br />
      <p>
        <input type="submit" class="button primary submit" value="Submit" />
      </p>
    </form>
    <div class="clear"></div>
  </div>
  <div class="tab" id="secondtab">
    <h2>Account details</h2>
    <form class="wymupdate" id="profile_pass" onsubmit="mw.users.save('#profile_pass', process_account_save); return false;">
      <div>
        <section>
          <label for="username"> Username* <small>The username must consist of at least 3 characters</small> </label>
          <div>
            <input type="text" id="username" name="username"   class="required" minlength="3" value="<? print $form_values['username'];  ?>" />
            <a href="#" class="button icon loop">Check availability</a> </div>
        </section>
        <section>
          <label for="password"> Password* <small>The password must consist of at least 6 characters</small> </label>
          <div>
            <input placeholder="At least 8 characters" name="password" id="password" type="password" class="required" minlength="6" value="<? print $form_values['password'];  ?>" />
            <input name="confirm_password" type="password" placeholder="Confirm password" value="<? print $form_values['password'];  ?>" />
          </div>
        </section>
      </div>
      <div class="clear"></div>
      <br />
      <p>
        <input type="submit" class="button primary submit" value="Save changes" />
      </p>
    </form>
    <div class="clear"></div>
  </div>
</section>
