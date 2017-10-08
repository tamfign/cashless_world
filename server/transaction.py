import socket
import json
from dbInstance import mongodb

# This class will be initialed when one transaction is started
class transaction(object):
    # When transaction stared only user who start the transaction will be recorded
    def __init__(self, debit, transAmount,userlst = None):
        self.__debit = debit
        self.__credit = None
        self.__transState = False
        self.__transAmount = transAmount
        self.__userlst = userlst
    
    # Return boolean value for whether the transaction is finised
    def isTransFinished(self):  
        return self.__transState

    # Return the money that will be transfer between accounts
    def get_amount(self):
        return self.__transAmount
    
    # Method only run  when the credit user(person who get money) exist      
    def set_transState(self):
        #set if the transaction is done.
        # while false, listen to the response of bank server
        if not self.__credit == None:
            print('set_transState in',self.__credit)
            debit = self.__userlst.get_lst()[self.__debit].get_con()
            credit = self.__userlst.get_lst()[self.__credit].get_con()
            base = mongodb('http://ec2-52-36-241-1.us-west-2.compute.amazonaws.com:5984/')
            base.add_amount(self.__credit,self.__transAmount)
            print('get1.5:',self.__transAmount)
            base.del_amount(self.__debit,self.__transAmount)
            print('get2')
            credit.send(bytes(self.add_head(json.dumps({'Result':True,'balance':'$'+self.__transAmount+'.00'})), encoding="utf8"))
            self.__transState = True
            print('lalala,sended')
            credit.close()
            debit.close()

    # Before transaction finised, keep checking whether credit user is exist
    def run(self):
        while not self.isTransFinished():
            self.set_transState()
            #keep listening the bankserver
            #m = message(self.__bankServer.recv(1024))
        print ('trnsaction finished')
    
    #return userlist
    def set_userlst(self,userlst):
        self.__userlst = userlst
    
    # add credit user to the transaction
    def set_credit(self, credit):
        self.__credit = credit
 
    # add http head
    def add_head(self,message):
        content = 'HTTP/1.x 200 ok\r\nContent-Type: text/html\r\n\r\n'
        #content += '<br /><font color="green" size="7">register successs!</p>'
        content += message
        return content



