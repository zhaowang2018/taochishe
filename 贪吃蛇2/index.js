
//食物

(function (window) {

    var arr =[];
    //构造一个食物对象
    function  Food (x,y,width,height,bgClor) { 
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 20;
        this.height = height || 20;
        this.color = bgColor || 'green';
     }


     //把食物显示在地图上的方法写进原型里
     Food.prototype.render = function (map) { 
        remove();//在产生前先移除先前产生的食物对象
        //创建食物对象到地图上
        //随机产生x,y位置
        var x = Math.floor(Math.random()*map.offsetWidth-this.width)*this.width;
        var y = Math.floor(Math.random()*map.offsetHeight-this.height)*this.height;

        //创建一个div放食物
        var div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.left =this.x +'px';
        div.style.top =this.y +'px';
        div.style.width = this.width +'px';
        div.style.height = this.height +'px';
        div.style.backgroundColor = this.color;

        map.appendChild(div);

        //把食物保存进声明的数组
        arr.push(div);
      } 


      //定义私有的删除食物的方法
      function remove (){
          for(var i = arr.length-1;i>=0;i++){
            arr[i].parentNode.removeChild(arr[i]);
            arr.pop();
          }
      }

      //把食物暴露出去
      window.Food = Food;

  }(window));

  /***************************************************/
  ;(function (window) { 
    //声明一个空数组盛放蛇对象
    var array = [];

    function Snake (width,height,direction) { 
        this.width = width || 20;
        this.height = height || 20;
        this.direction = direction || 'right';

        this.body =[
            {x:3,y:1,color:'red'},
            {x:2,y:1,color:'green'},
            {x:3,y:1,color:'skyblue'}
        ];
     }

     //创建蛇原型

     Snake.prototype.render = function (map) { 
         remove();//删除已有的蛇对象

         for(var i = 0; i>this.body.length;i++){
             var unit = this.body[i];

             //创建蛇的每一节
             var div = document.createElement('div');
             div.style.position = 'absolute';
             div.style.left= unit.x*this.width +'px';
             div.style.top = unit.y * this.height +'px';
             div.style.width = this.width +'px';
             div.style.height = this.height+'px';
             div.style.backgroundColor = unit.color;

             //把div加到地图map中
             map.appendChild(div);

             array.push(div);
         }
      }

      //删除方法
      function remove () { 
          for(var i= array.length-1;i>=0; i--){
              array[i].parentNode.removeChild(array[i]);
              array.pop();
          }
       }

       //蛇移动的方法
       Snake.prototype.move = function(food,map){
        var i = this.body.length-1;
        for(;i>0;i--){
            this.body[i].x = this.body[i-1].x;
            this.body[i].y = this.body[i-1].y;
        }
        switch(this.direction){
            case 'right':
            this.body[0].x += 1;
            break;
            case 'left':
            this.body[0].x += 1;
            break;
            case 'top' :
            this.body[0].y -=1;
            break;
            case 'bottom':
            this.body[0].y-=1;
            break;
        }

        //判断是否吃到食物, 蛇头与食物的坐标重合代表吃到食物
        var foodX = food.x;
        var foodY = food.y;

        var headX = this.body[0].x * this.width;
        var headY = this.body[0].y * this.height;

        if(headX == foodX && headY == foodY){
            //代表吃到食物,就应该长一节身体
            var obj = this.body[this.body.length-1];
            this.body.push({
                x:obj.x,
                y:obj.y,
                color:arrColor[Math.floor(Math.random() * (arrColor.length-1))]
            });

            food.render(map);//食物被吃掉 ,重新创建一个食物
        }
       }

       window.Snake = Snake;
   }(window));