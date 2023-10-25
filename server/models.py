from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

db = SQLAlchemy()


class UserInvestor(db.Model):
    __tablename__ = 'user_investors'

    id = db.Column(db.Integer(), primary_key=True)
    name= db.Column(db.String)
    category= db.Column(db.String)
    user_id = db.Column(db.Integer(), db.ForeignKey('users.id'))
    investor_id = db.Column(db.Integer(), db.ForeignKey('investors.id'))
    created_at= db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    description= db.Column(db.String)
    
    user = db.relationship('User', back_populates='user_investors')
    investor = db.relationship('Investor', back_populates='users')

    

    @validates("category")
    def validate_strength(self, key, category):
        # categories = ["Agriculture", "Medical", "Engineering", "Software", "Arts", "Science", "AI",
        #              "Social", "SEcurity", "Weather", "Geography", "Soil", "Environment", "Computer", 
        #              "Mechanical", "Mathematics", "Electrical","Modelling", "Production", "Animals",
        #              "Kennedy", "Peter", "John", "Paul", "Kevin", "Bob", "Winnie",
        #              "Chemical", "Cloud", "Microsoft"]
        # if category not in categories:
        #     raise ValueError("Invalid category")
        return category
 

    def __repr__(self):

        return f'user_investors(id={self.id}'
         

class User(db.Model):
    __tablename__ = 'users'


    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String)
    email= db.Column(db.String)
    contact= db.Column(db.Integer)
    password= db.Column(db.String)


    user_investors = db.relationship('UserInvestor', back_populates='user')


    def __repr__(self):
        return f'User {self.name}'
    

class Investor(db.Model):
    __tablename__ = 'investors'

    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String)
    company= db.Column(db.String)
    contact= db.Column(db.Integer)
    email= db.Column(db.String)  


    @validates("company")
    def validate_company(self, key, company):
        if company =="":
            raise ValueError("company can not be blank")
        return company

    users = db.relationship('UserInvestor', back_populates='investor')

    def __repr__(self):
        return f'Investor {self.name}'

class AuditTrail(db.Model):
    __tablename__ = 'audittrails'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('users.id'))
    timein= db.Column(db.DateTime, server_default=db.func.now())
    timeout = db.Column(db.DateTime, onupdate=db.func.now())
  

    users = db.relationship('User', backref='audittrails')

    def __repr__(self):
        return f'AuditTrail {self.id}'        