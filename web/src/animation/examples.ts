export const examples = [
  `hypot(x-=t%4*5,y-=8)<6&&x<y|y<-x`,
  `sin(y/8+t)`,
  `random() < 0.1`,
  `sin(t)`,
  `y-t`,
  `(y-4*t|0) * (x-2-t|0)`,
  `4 * t & i & x & y`,
  `(t*10) & (1<<x) && y==8`,
  `cos(t + i + x * y)`,
  `sin(x/2) - sin(x-t) - y+6`,
  `(x-8)*(y-8) - sin(t)*64`,
  `-.4/(hypot(x-t%10,y-t%8)-t%2*9)`,
  `(((x-8)/y+t*5)&1^1/y*8&1)*y/5`,
  `d=y*y%5.9+1,!((x+t*50/d)&15)/d`,
  `1/32*tan(t/64*x*tan(i-x))`,
  `8*t%13 - hypot(x-7.5, y-7.5)`,
  `(x-y) - sin(t) * 16`,
  `(x-y)/24 - sin(t)`,
  `8*t%13 - hypot(x-7.5, y-7.5)`,
  `(x-5)**2 + (y-5)**2 - 99*sin(t)`,
];
