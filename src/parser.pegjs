/*
 * Simple Conditional Grammar
 * ==========================
 *
 * Accepts expressions like "IF 1 IS EQUAL TO 1 THEN result ELSE IF 1 IS EQUAL TO 0 THEN another" and computes their result.
 */

Expression
  = "IF"i _ cond:Conditional _ "THEN"i _ result:String els:( _ "ELSE"i _ Expression)? {
      els = els && els[els.length - 1]
      return { els: els, cond: cond, result: result };
    }

Conditional
  = left:Integer _ "IS EQUAL TO"i _ right:Integer {
      return { left: left, right: right, op: '===' };
    }

String "string"
  = [a-zA-Z0-9]+ { return text(); }

Integer "integer"
  = [0-9]+ { return parseInt(text(), 10); }

_ "whitespace"
  = [ \t\n\r]*
