import os from 'os';
import { expect } from 'chai';
import sinon from 'sinon';
import rewire from 'rewire';

const fsfilesystem = rewire('../../src/utilities.js');

describe('general utilities', function() {
  describe('lasti', function(){
    const lasti = fsfilesystem.__get__('lasti');

    it('should return the last index of an array', function(done) {
      const a = [0, 1, 2];
      expect(lasti(a)).to.be.equal(2);
      a.pop();
      expect(lasti(a)).to.be.equal(1);
      a.pop();
      expect(lasti(a)).to.be.equal(0);
      done();
    });

    it('should return undefined for an empty array', function(done) {
      expect(lasti([])).to.be.undefined;
      done();
    });

    it('should return the last index of a string', function(done) {
      const a = '012';
      expect(lasti(a)).to.be.equal('2');
      expect(lasti(a.substr(0, 2))).to.be.equal('1');
      expect(lasti(a.substr(0, 1))).to.be.equal('0');
      done();
    });

    it('should return undefined for an empty string', function(done) {
      expect(lasti('')).to.be.undefined;
      done();
    });
  });

  describe('stringify', function(){
    const stringify = fsfilesystem.__get__('stringify');

    it('should call the toString method on the passed object', function(done){
      const o = {
        toString: sinon.spy()
      };
      stringify(o);
      expect(o.toString.calledOnce).to.be.true;
      done();
    });

    it('should cast the passed primitive value to a string', function(done){
      expect(stringify(true)).to.be.equal('true');
      expect(stringify(0)).to.be.equal('0');
      expect(stringify(0.1)).to.be.equal('0.1');
      expect(stringify(null)).to.be.equal('null');
      expect(stringify(undefined)).to.be.equal('undefined');
      expect(stringify(Symbol('Cupcakes'))).to.be.equal('Symbol(Cupcakes)');
      expect(stringify(() => {})).to.be.equal('function () {}');
      done();
    });
  });

  describe('hasSubstr', function(){
    const hasSubstr = fsfilesystem.__get__('hasSubstr');

    it('should return true if substring is part of string', function(done){
      expect(hasSubstr('sa', 'a')).to.be.true;
      done();
    });

    it('should return false if substring is not part of string', function(done){
      expect(hasSubstr('sa', 'b')).to.be.false;
      done();
    });
  });

  describe('getYesNo', function(){
    const getYesNo = fsfilesystem.__get__('getYesNo');

    it('should return true if argument is \'Yes\'', function(done){
      expect(getYesNo('Yes')).to.be.true;
      done();
    });

    it('should return false if argument is \'No\'', function(done){
      expect(getYesNo('No')).to.be.false;
      done();
    });

    it('should return undefined otherwise', function(done){
      expect(getYesNo('foo')).to.be.undefined;
      expect(getYesNo(true)).to.be.undefined;
      expect(getYesNo(false)).to.be.undefined;
      expect(getYesNo(0)).to.be.undefined;
      expect(getYesNo(1)).to.be.undefined;
      expect(getYesNo(null)).to.be.undefined;
      expect(getYesNo(undefined)).to.be.undefined;
      expect(getYesNo(Symbol('Cupcakes'))).to.be.undefined;
      expect(getYesNo(() => {})).to.be.undefined;
      expect(getYesNo({})).to.be.undefined;
      done();
    });
  });

  describe('splitEOL', function(){
    const splitEOL = fsfilesystem.__get__('splitEOL');

    it('should split string on the EOL character', function(done){
      const split = splitEOL(['a', 'b', 'c'].join(os.EOL));
      expect(split[0]).to.be.equal('a');
      expect(split[1]).to.be.equal('b');
      expect(split[2]).to.be.equal('c');
      done();
    });

    it('should return a function if provided a number', function(done){
      expect(splitEOL(2)).to.be.a('function');
      done();
    });

    it('should split string on multiple EOL characters', function(done){
      const arr = [`a${os.EOL}a`, `a${os.EOL}a`, `a${os.EOL}a`];
      const split = splitEOL(2)(arr.join(`${os.EOL}${os.EOL}`));
      expect(split[0]).to.be.equal(arr[0]);
      expect(split[1]).to.be.equal(arr[1]);
      expect(split[2]).to.be.equal(arr[2]);
      done();
    });
  });
});
