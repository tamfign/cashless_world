import couchdb
import sys
import random

# This class is about the database and database relevant action
class mongodb(object):
    
    def __init__(self, address,conn=None):
        self.__host = address[0]
        self.__port = address[1]
        self.__couch = couchdb.Server(address)
        self.__conn = conn
        self.__information = []


    # return the database
    def get_couch(self):
        return self.__couch
  

    # Function that deal with the card save function
    # @input: userid and relevant parameters
    # @output: if the card in the first card saved for paticular userid; card name is defaultcard; otherwise is the card number 
    def userInfomationGenerate(self,userid,cardNumber,holderName,expireDate,csv):
        print(userid)
        _db = self.__couch[userid]
        money= random.randint(1,10000)
        #doc = _db.get('CardInfo')
        try:
            doc = _db.get('CardInfo')
            name = cardNumber
            doc[name] = {'balance':str(money),'CardNumber':cardNumber ,'HolderName':holderName,'ExpireDate':expireDate,'CSV':csv}
            _db.save(doc)
        except:
            doc = {'_id':'CardInfo','DefaultCard':{'balance':str(money),'CardNumber':cardNumber ,'HolderName':holderName,'ExpireDate':expireDate,'CSV':csv}}
            _db.save(doc)

    # Return the message that will user used to send
    def get_card(self,username):
        try:
            _db = self.__couch[username]
            print(username)
            doc =self.remove_rev( _db.get('CardInfo'))
            #money = self.remove_rev(_db.get('Amount'))
            message = doc
            print('message',message)
        except:
            print (sys.exc_info())
            message = {'Result': []}
        return message

    #create user file if necessary
    def createUser(self, username):
        try:
            print('create user: ',username)
            self.__couch.create(username)
        except:
            # if the user is already exsit in db
            # no need to create user
            pass

    # when doing transaciton , add money to default card of user
    def add_amount (self,username,money):
        _datadb = self.__couch[username]
        try:
            doc = _datadb.get('CardInfo')
            a = doc['DefaultCard']['balance']
            doc['DefaultCard']['balance'] = str(int(a) +int(money))
            _datadb.save(doc)
        except:
            # In case the user don't have card in db
            print ('add error', sys.exc_info())

    # return necessary parameters to client
    def remove_rev(self,doc):
        lst = []
        for step in doc:
            # the name of file should be _rev and _id, the other name are related to card
            if (step != '_rev') and (step != '_id'):
                dic = {}
                for key in doc[step]:
                    # Get three necessary parameters and set them in dictionary
                    if key == 'HolderName':
                        dic[key]=doc[step][key]
                    elif key == 'CardNumber':
                        dic[key]=doc[step][key]
                    elif key == 'balance':
                        dic[key]='$'+doc[step][key]+'.00'
                lst.append(dic)
            else:
                print ('_rev or _id')
        # The return is in format [{..},{..},..]
        return lst
    
# delete money when user pay money
    def del_amount(self, username, money):
        _datadb = self.__couch[username]
        try:
            doc = _datadb.get('CardInfo')
            a = doc['DefaultCard']['balance']
            doc['DefaultCard']['balance'] =str(int(a) -int(money))
            _datadb.save(doc)
        except:
            print ('del error', sys.exc_info())


