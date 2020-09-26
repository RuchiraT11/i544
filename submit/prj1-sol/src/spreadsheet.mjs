import parse from './expr-parser.mjs';
import AppError from './app-error.mjs';
import { cellRefToCellId } from './util.mjs';

//use for development only
import { inspect } from 'util';

export default class Spreadsheet {

  //factory method
  static async make() { return new Spreadsheet(); }

  constructor() {
    //@TODO
    //return spreadsheet representation
    this.cells={};
    for(let column=0;column<26;column++){
      for(let row=1;row<=99;row++){
       return (column+10).toString(36).concat(row);
      }
    }
  }

  /** Set cell with id baseCellId to result of evaluating formula
   *  specified by the string expr.  Update all cells which are
   *  directly or indirectly dependent on the base cell.  Return an
   *  object mapping the id's of all dependent cells to their updated
   *  values.  User errors must be reported by throwing a suitable
   *  AppError object having code property set to `SYNTAX` for a
   *  syntax error and `CIRCULAR_REF` for a circular reference
   *  and message property set to a suitable error message.
   */
  async eval(baseCellId, expr) {
    const updates = {};
    //@TODO
    const ast= parse(expr);
    var result= evaluateAst(ast);
    this.cells=new CellInfo(baseCellId,expr,result,ast); //dependent
    updates[baseCellId]=result;
    return updates;
  }

  //@TODO add methods
}

//Map fn property of Ast type === 'app' to corresponding function.
const FNS = {
  '+': (a, b) => a + b,
  '-': (a, b=null) => b === null ? -a : a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
  min: (...args) => Math.min(...args),
  max: (...args) => Math.max(...args),
}


//@TODO add other classes, functions, constants etc as needed
class CellInfo{
  
  constructor(id,expr,value,ast){  //,dependents
      this.id= id;
      this.expr=expr;
      this.value= (value==null)?0:value;
     // this.dependentSet=dependents;
      this.ast=ast;
  }
  
}
//evaluateAst(ast) function will evaluate the ast based on its type: num, app, etc
function evaluateAst(ast) {
switch(ast.type){
  case 'num':
    return ast.value;
}
}