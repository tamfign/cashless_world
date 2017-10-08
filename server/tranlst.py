class tranlst(object):
# This is the instance of a dict instance.
# This class will be used as user list and transfer list

    # The initial value of dictionary will be empty    
    def __init__(self):
        self.__translst = {}

    # set dictionary with key=ele and value=ins 
    def set_lst(self, ele, ins):
        self.__translst[ele] = ins
    
    #get the dictionary
    def get_lst(self):
        return self.__translst

    # return the keys of the lst
    def keys(self):
        return self.__translst.keys()
