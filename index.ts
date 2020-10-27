interface OptionsState {
  id: string;
  canvasId: string;
  width: string;
  height: string;
  type: string;
  size: number;
  code: string;
  numArr: string[];
  letterArr: string[];

  [key: string]: any;
}

interface ParamsOptions {
  id: string;
  canvasId?: string;
  width?: string;
  height?: string;
  type?: 'blend' | 'number' | 'letter'; // 图形验证码默认类型blend:数字字母混合类型、number:纯数字、letter:纯字母
  size?: number;

  [key: string]: any;
}

export default class GVerify {
  private options: OptionsState = {
    id: '',
    canvasId: 'verifyCanvas',
    width: '130',
    height: '38',
    type: 'blend',
    code: '',
    numArr: [],
    letterArr: [],
    size: 4,
  };

  constructor(options: ParamsOptions) {
    let key: string;
    for (key of Object.keys(options)) {
      this.options[key] = options[key];
    }
    this.options.numArr = '0,1,2,3,4,5,6,7,8,9'.split(',');
    this.options.letterArr = this.getAllLetter();

    this.init();
    this.refresh();
  }

  private getAllLetter(): string[] {
    const letterStr: string = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z';
    return letterStr.split(',');
  }

  private init() {
    const con = document.getElementById(this.options.id);
    const canvas = document.createElement('canvas');
    canvas.id = this.options.canvasId;
    canvas.width = Number(this.options.width);
    canvas.height = Number(this.options.height);
    canvas.style.cursor = 'pointer';
    canvas.innerHTML = '您的浏览器版本不支持canvas';
    (con as HTMLElement).appendChild(canvas);
    const parent = this;
    canvas.onclick = () => {
      parent.refresh();
    };
  }

  public validate(code: string) {
    const CCode = code.toLowerCase();
    const vCode = this.options.code.toLowerCase();
    if (CCode === vCode) {
      return true;
    } else {
      this.refresh();
      return false;
    }
  }

  private refresh() {
    this.options.code = '';
    const canvas = document.getElementById(this.options.canvasId);
    let ctx: CanvasRenderingContext2D | undefined = undefined;
    if ((canvas as HTMLCanvasElement).getContext) {
      ctx = (canvas as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D;
    } else {
      return;
    }

    if (!ctx) {
      return;
    }

    ctx.textBaseline = 'middle';
    ctx.fillStyle = this.randomColor(180, 240);
    ctx.fillRect(0, 0, Number(this.options.width), Number(this.options.height));

    let txtArr: string[] = [];
    if (this.options.type === 'blend') {
      txtArr = this.options.numArr.concat(this.options.letterArr);
    } else if (this.options.type === 'number') {
      txtArr = this.options.numArr;
    } else {
      txtArr = this.options.letterArr;
    }

    for (let i = 1; i <= this.options.size; i++) {
      const txt = txtArr[this.randomNum(0, txtArr.length)];
      this.options.code += txt;
      ctx.font = this.randomNum(
        Number(this.options.height),
        Number(this.options.height)) + 'px SimHei'; // 随机生成字体大小
      // ctx.font = randomNum(this.options.height/2, this.options.height) + 'px SimHei'; //随机生成字体大小
      ctx.fillStyle = this.randomColor(50, 160); // 随机生成字体颜色
      ctx.shadowOffsetX = this.randomNum(-3, 3);
      ctx.shadowOffsetY = this.randomNum(-3, 3);
      ctx.shadowBlur = this.randomNum(-3, 3);
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      const x = Number(this.options.width) / (this.options.size + 1) * i;
      const y = Number(this.options.height) / 2;
      const deg = this.randomNum(-30, 30);
      /* 设置旋转角度和坐标原点**/
      ctx.translate(x, y);
      ctx.rotate(deg * Math.PI / 180);
      ctx.fillText(txt, 0, 0);
      /* 恢复旋转角度和坐标原点**/
      ctx.rotate(-deg * Math.PI / 180);
      ctx.translate(-x, -y);
    }
    /* 绘制干扰线**/
    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = this.randomColor(40, 180);
      ctx.beginPath();
      ctx
        .moveTo(this.randomNum(0, Number(this.options.width)), this.randomNum(0, Number(this.options.height)));
      ctx
        .lineTo(this.randomNum(0, Number(this.options.width)), this.randomNum(0, Number(this.options.height)));
      ctx.stroke();
    }
    /* 绘制干扰点**/
    for (let i = 0; i < Number(this.options.width) / 4; i++) {
      ctx.fillStyle = this.randomColor(0, 255);
      ctx.beginPath();
      ctx
        .arc(
          this.randomNum(0, Number(this.options.width)),
          this.randomNum(0, Number(this.options.height)),
          1,
          0,
          2 * Math.PI);
      ctx.fill();
    }
  }

  private randomNum(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  private randomColor(min: number, max: number) {
    const r = this.randomNum(min, max);
    const g = this.randomNum(min, max);
    const b = this.randomNum(min, max);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

}
