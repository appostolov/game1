var c1 = document.getElementById("can");
var c = c1.getContext("2d");

//BACKGROUND COLOR
var back = ["img","img1","img2","img4","img3"];
var nn = 0;
var win = "win_img";

var ar_font = 20;
var ar_num = 0.1;

//BALL object
var ball = new Object();
ball.x = c1.width/2;
ball.y = 55;
ball.r = 15;
ball.color = "red";
ball.dir = 90;
ball.vell = 3;

//BASE object
var base = new Object();
base.x = 0;
base.height = 30;
base.y = c1.height - base.height;
base.width = 100;
base.color = "black";
base.vell = 3;

//KEY DOWN EVENT
document.addEventListener('keydown', function(event){
	
	var key_press = String.fromCharCode(event.keyCode);
	if(key_press == "D" && base.x < c1.width-base.width){
		m_r = true;
	}
	
	if(key_press == "A" && base.x > 0){
		m_l = true;
	}
	
});

//KEY UP EVENT
document.addEventListener('keyup', function(event){
	
	var key_press = String.fromCharCode(event.keyCode);
	if(key_press == "D"){
		m_r = false;
	}
	
	if(key_press == "A" ){
		m_l = false;
	}
	
});

var num = 6;
var tar = new Array();
var sub_x;
var sub_y;

for(var a = 0; a < num; a++){
	tar[a] = new Object();
	tar[a].x = 2 + a*83;
	tar[a].y = 2;
	tar[a].w = 81;
	tar[a].h = 37;
	tar[a].live = true;
	tar[a].color = "green";
}

//MAIN GAME LOOP
var game_loop = setInterval(function(){
	
	var count = 0;

	//BACKGROUND
	var img=document.getElementById(back[nn]);
	c.drawImage(img,0,0);
	
	var brick_view=document.getElementById("brick_img");
	for(var a = 0; a < num; a++){
		if(tar[a].live == true){
			c.drawImage(brick_view,tar[a].x,tar[a].y);
		}	
	}

	//BALL
	c.fillStyle = "rgba(0,0,0,0)";
	c.beginPath();
	c.arc(ball.x,ball.y,ball.r,0,2*Math.PI);
	c.fill();
	
	var ball_view=document.getElementById("ball_img");
	c.drawImage(ball_view,ball.x-ball.r,ball.y-ball.r);
	
	//BALL movement
	ball.x += ball.vell*Math.cos(ball.dir*Math.PI/180);
	ball.y += ball.vell*Math.sin(ball.dir*Math.PI/180);
	
	//BALL hit right wall
	if(ball.x >= c1.width - ball.r){
		ball.x = c1.width - ball.r;
		ball.dir = 180 - ball.dir;
	}
	
	//BALL hit left wall
	if(ball.x <= ball.r){
		ball.x = ball.r;
		ball.dir = 180 - ball.dir;
	}
	
	//BALL hit top
	if(ball.y <= ball.r){
		ball.y = ball.r;
		ball.dir = 360 - ball.dir;
	}

	//BASE
	var base_view = document.getElementById("base_img");
	c.drawImage(base_view,base.x,base.y);
	
	//BASE hit left wall
	if(base.x < 0){
		base.x = 0;
	}
	
	//BASE hit the right wall
	if(base.x > c1.width - base.width){
		base.x = c1.width - base.width;
	}
	
	//BASE left corner to ball lenght
	var base_left_ball_lenght = Math.sqrt(Math.pow(base.y-ball.y,2)+Math.pow(base.x-ball.x,2));
	//BASE left corner to ball direction
	var base_left_ball_dir = Math.atan2(base.y-ball.y,base.x-ball.x)*180/Math.PI;
	//BASE hit the ball with left corner
	if(base_left_ball_lenght <= ball.r && base_left_ball_dir < 90){
		ball.dir = 180 + base_left_ball_dir;
	}
	
	//BASE right corner to ball lenght
	base_right_ball_lenght = Math.sqrt(Math.pow(base.y-ball.y,2)+Math.pow(base.x+base.width-ball.x,2));
	//BASE right corner to ball direction
	base_right_ball_dir = Math.atan2(base.y-ball.y,base.x+base.width-ball.x)*180/Math.PI;
	//BASE hit the ball with right corner
	if(base_right_ball_lenght <= ball.r && base_right_ball_dir > 90){
		ball.dir = 180 + base_right_ball_dir;
	}
	
	//BASE hit the ball with top side
	if(base_left_ball_dir >= 90 && base_right_ball_dir <= 90 && ball.y >= base.y - ball.r){
		ball.y = base.y - ball.r;
		ball.dir = 360 - ball.dir;
		if(m_l == true){
			ball.dir -= 30;
		}
		if(m_r == true){
			ball.dir += 30;
		}
	}
	
	//BASE hit the ball with left or right side
	if(ball.y > base.y){
		if(base_left_ball_dir >= -90 && base_left_ball_dir <= 0 &&ball.x > base.x - ball.r){
			if(m_l == true){
				ball.x = base.x - ball.r - base.vell;
				ball.dir = 180 - ball.dir;
			}else{
				ball.x = base.x - ball.r;
				ball.dir = 180 - ball.dir;
			}
		}
		if(base_right_ball_dir <= -90 && base_right_ball_dir <= 0 && ball.x < base.x + base.width + ball.r){
			if(m_r == true){
				ball.x = base.x + base.width + ball.r + base.vell;
				ball.dir = 180 - ball.dir;
			}else{
				ball.x = base.x + base.width + ball.r;
				ball.dir = 180 - ball.dir;
			}
		}
		if(ball.x <= ball.r && base.x <= ball.x + ball.r){
			base.x = ball.x + ball.r;
			m_l = false;
		}
		if(ball.x >= c1.width - ball.r && base.x >= ball.x - ball.r - base.width){
			base.x = ball.x - ball.r - base.width;
			m_r = false;
		}
	}
	
	for(var a = 0; a < num; a++){
		
		if(tar[a].live == true){
			var tar_top_left_lenght = Math.sqrt(Math.pow(tar[a].y-ball.y,2)+Math.pow(tar[a].x-ball.x,2));
			var tar_top_left_dir = Math.atan2(tar[a].y-ball.y,tar[a].x-ball.x)*180/Math.PI;
			
			var tar_top_right_lenght = Math.sqrt(Math.pow(tar[a].y-ball.y,2)+Math.pow(tar[a].x+tar[a].w-ball.x,2));
			var tar_top_right_dir = Math.atan2(tar[a].y-ball.y,tar[a].x+tar[a].w-ball.x)*180/Math.PI;
			
			var tar_bottom_left_lenght = Math.sqrt(Math.pow(tar[a].y+tar[a].h-ball.y,2)+Math.pow(tar[a].x-ball.x,2));
			var tar_bottom_left_dir = Math.atan2(tar[a].y+tar[a].h-ball.y,tar[a].x-ball.x)*180/Math.PI;
			
			var tar_bottom_right_lenght = Math.sqrt(Math.pow(tar[a].y+tar[a].h-ball.y,2)+Math.pow(tar[a].x+tar[a].w-ball.x,2));
			var tar_bottom_right_dir = Math.atan2(tar[a].y+tar[a].h-ball.y,tar[a].x+tar[a].w-ball.x)*180/Math.PI;
			
			if(tar_top_left_lenght <= ball.r){
				tar[a].live = false;
				ball.dir = 180 + tar_top_left_dir;
			}
			
			if(tar_top_right_lenght <= ball.r){
				tar[a].live = false;
				ball.dir = 180 + tar_right_left_dir;
			}
			
			if(tar_bottom_left_lenght <= ball.r){
				tar[a].live = false;
				ball.dir = 180 + tar_bottom_left_dir;
			}
			
			if(tar_bottom_right_lenght <= ball.r){
				tar[a].live = false;
				ball.dir = 180 + tar_bottom_right_dir;
			}
			
			if(tar_bottom_left_dir < -90 && tar_bottom_right_dir > -90 && ball.y < tar[a].y + tar[a].h + ball.r){
				tar[a].live = false;
				ball.y = tar[a].y + tar[a].h + ball.r;
				ball.dir = 360 - ball.dir;
			}
			
			if(tar_top_left_dir > 90 && tar_top_right_dir < 90 && ball.y > tar[a].y - ball.r){
				tar[a].live = false;
				ball.y = tar[a].y - ball.r;
				ball.dir = 360 - ball.dir;
			}
			
			if(tar_top_left_dir < 0 && tar_top_left_dir > -90 && tar_bottom_left_dir > 0 && ball.x > tar[a].x - ball.r){
				tar[a].live = false;
				ball.x = tar[a].x - ball.r;
				ball.dir = 180 - ball.dir;
			}
			
			if(tar_top_right_dir < 0 && tar_bottom_right_dir > 90 && ball.x < tar[a].x + tar[a].w + ball.r){
				tar[a].live = false;
				ball.x = tar[a].x + tar[a].w + ball.r;
				ball.dir = 180 - ball.dir;
			}
		}
	}
	
	for(var a = 0; a < num; a++){
		if(tar[a].live == false){
			count++;
		}
	}
	
	//BALL hit the bottom
	if(ball.y >= c1.height - ball.r){
		nn = 0;
		num = 6;
		for(var a = 0; a < num; a++){
			tar[a].live = true;
		}
		
		ball.x = c1.width/2;
		ball.y = 55;
		ball.r = 15;
		ball.dir = 90;
		ball.vell = 3;
		
		base.vell = 3;

	}
	
	if(count == num){
		
			nn += 1;	
			ball.vell += 1.5;
			base.vell += 1.3;
			num += 6;
			count = 0;
			sub_x = 0;
			sub_y = 2;
			for(var a = 0; a < num; a++){
				if(sub_x == 6){
					sub_y += 39;
					sub_x = 0;
				}
				tar[a] = new Object();
				tar[a].x = 2 + sub_x*83;
				tar[a].y = sub_y;
				tar[a].w = 81;
				tar[a].h = 37;
				tar[a].live = true;
				tar[a].color = "green";
				sub_x++;
			}
			ball.y = 37*(num/5) + ball.r + 1;
			ball.x = base.x + base.width/2;
			ball.dir = 90;
		}
		if(num == 36){
			clearInterval(game_loop);
				var img1=document.getElementById("success");
				c.drawImage(img1,0,0);	
			}
			
		if(ar_font >= 22 || ar_font < 20){
			ar_num = -ar_num;
		}
			
		document.getElementById("arr_1").style.fontSize = ar_font+"px";
		document.getElementById("arr_2").style.fontSize = ar_font+"px";
		
		ar_font += ar_num;
	
	//BASE movement
	if(m_r == true && base.x < c1.width - base.width){
		base.x += base.vell;
	}
	
	if(m_l == true && base.x > 0){
		base.x -= base.vell;
	}

},17);

//var img=document.getElementById("success");
//c.drawImage(img,0,0);
