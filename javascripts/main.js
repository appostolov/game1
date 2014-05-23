var can = document.getElementById("canvas");
var c = can.getContext("2d");

var back_color = "gray";
var t_color = "green";

var num = 6;
var hits = 0;

var x = 100;
var y = 100;
var w = 20;
var h = 20;
var vel_x = 2;
var vel_y = 2;

var b_x = 200;
var b_y = 470;
var b_w = 100;
var b_h = 25;
var b_vell = 5;
var m_l = false;
var m_r = false;

var t_x_num = 2;
var t_x = new Array;
var t_y = new Array;
var t_w = 81;
var t_h = 25;
var t_live = new Array;
for(var b = 0; b<num; b++){
	t_x[b] = t_x_num+b*83;
	t_y[b] = 2;
	t_live[b] = true;
}

document.addEventListener('keydown', function(event){
	
	var key_press = String.fromCharCode(event.keyCode);
	if(key_press == "D" && b_x < can.width-b_w){
		m_r = true;
	}
	
	if(key_press == "A" && b_x > 0){
		m_l = true;
	}
	
});

document.addEventListener('keyup', function(event){
	
	var key_press = String.fromCharCode(event.keyCode);
	if(key_press == "D" && b_x < can.width-b_w){
		m_r = false;
	}
	
	if(key_press == "A" && b_x > 0){
		m_l = false;
	}
	
});


setInterval(function(){

		c.fillStyle = back_color;
		c.fillRect(0,0,can.width,can.height);
		
		c.fillStyle = "red";
		c.fillRect(x,y,w,h);
		
		c.fillStyle = "blue";
		c.fillRect(b_x,b_y,b_w,b_h);
		
		for(var a = 0; a < num; a++){
			
			if(t_live[a] == true){
			c.fillStyle = t_color;
			c.fillRect(t_x[a],t_y[a],t_w,t_h);
			}
		}
		
		x+=vel_x;
		y+=vel_y;
		
		if(x < 0 || x > can.width - w){
			vel_x = -vel_x;
		}
		
		if(y < 0){
			vel_y = -vel_y;
		}
		
		if(b_x-b_vell <0){
			b_x = 0;
			m_l = false;
		}
		
		if(b_x+b_w+b_vell > can.width){
			b_x = can.width - b_w;
			m_r = false;
		}
		
		if(m_r == true){
			b_x += b_vell;
		}
		
		if(m_l == true){
			b_x -= b_vell;
		}
		
		if(x+w > b_x && x < b_x+b_w){
			if(y+h > b_y && y < b_y+b_h){
				vel_y = -vel_y;
				if(m_r == true){
					vel_x += 1;
				}
				if(m_l == true){
					vel_x -= 1;
				}
			}
		}
		
		if(y+h > b_y && y < b_y+b_h){
			if(x+w == b_x || x == b_x+b_w){
				vel_x = -vel_x;
				if(m_r == true){
					vel_x += 1;
				}
				if(m_l == true){
					vel_x -= 1;
				}
			}
		}
		
		for(var b = 0; b<num; b++){
			if( t_live[b] == true){
				if(x<t_x[b]+t_w && x+w>t_x[b]){
					if(y<t_y[b]+t_h && y+w>t_y[b]){
						vel_y = -vel_y;
						t_live[b] = false;
						hits += 1;
					}	
				}
			}
			
		}
		
		if(y+h > can.height){
			back_color = "gray";
			t_color = "green";
			num = 6;
			hits = 0;
			x = 100;
			y = 100;
			w = 20;
			h = 20;
			vel_x = 2;
			vel_y = 2;
			
			for(var b = 0; b<num; b++){
				t_live[b] = true;
			}
			
			hits = 0;

		}
		
		if(hits == num){
			num += 6;
			if(num == 12){
				back_color = "#222";
				t_color = "yellow";
			}
			if(num == 18){
				back_color = "#000";
				t_color = "red";
			}
			hits = 0;
			vel_x += 1.05*vel_x;
			vel_y += 1.05*vel_y;
			b_vell += 1;
			var u = 0;
			var o = 0;
			for(var b = 0; b<num; b++){
				if(u == 6){
					u = 0;
					o+=27;
				}
				t_x[b] = t_x_num+u*83;
				t_y[b] = o + 2;
				c.fillStyle = "yellow";
				c.fillRect(t_x[b],t_y[b],t_w,t_h);
				t_live[b] = true;
				u++;
			}
			y = o + 35;
			
		}
	
	},16);
