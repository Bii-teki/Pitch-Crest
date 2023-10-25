from random import randint, choice as rc
from faker import Faker
from models import db, User, Investor, UserInvestor,AuditTrail
from app import app

fake = Faker()

categories = ["Agriculture", "Medical", "Engineering", "Software", "Arts", "Science", "AI",
 "Social", "SEcurity", "Weather", "Geography", "Soil", "Environment", "Computer", 
 "Mechanical", "Mathematics", "Electrical","Modelling", "Production", "Animals",
 "Kennedy", "Peter", "John", "Paul", "Kevin", "Bob", "Winnie",
 "Chemical", "Cloud", "Microsoft"]


projects = ["Planting macademia", "Researching on malaria", "Engineering", "Software", "Arts", "Science", "AI",
 "Social", "SEcurity", "Weather", "Geography", "Soil", "Environment", "Computer", 
 "Mechanical", "Mathematics", "Electrical","Modelling", "Production", "Animals",
 "Kennedy", "Peter", "John", "Paul", "Kevin", "Bob", "Winnie",
 "Chemical", "Cloud", "Microsoft"]

descriptions = ["Planting macademia through irrigation in ukambani", "Medical", "Engineering", "Software", "Arts", "Science", "AI",
 "Social", "SEcurity", "Weather", "Geography", "Soil", "Environment", "Computer", 
 "Mechanical", "Mathematics", "Electrical","Modelling", "Production", "Animals",
 "Kennedy", "Peter", "John", "Paul", "Kevin", "Bob", "Winnie",
 "Chemical", "Cloud", "Microsoft"]

with app.app_context():

    User.query.delete()
    Investor.query.delete()
    UserInvestor.query.delete()

    users = []
    for n in range(25):
        u = User(name=fake.name(), email=fake.email(), contact=fake.phone_number(), password=fake.password())  
        users.append(u)

    db.session.add_all(users)

    investors = []
    for i in range(25):
        n = Investor(name=fake.company(), contact=fake.phone_number(), email=fake.email())
        investors.append(n)

    db.session.add_all(investors)    

    user_investors = []
   
    for i in range(30):
        name=fake.unique.name()
        hi = UserInvestor(name=rc(projects),category=rc(categories), user_id=randint(1, 10), investor_id=randint(1, 10),description=rc(descriptions))   
        user_investors.append(hi)

    db.session.add_all(user_investors)   

    audittrails = []
    for i in range(30):
        hi = AuditTrail(user_id=randint(1, 10))    
        audittrails.append(hi)

    db.session.add_all(audittrails)   
    db.session.commit()
