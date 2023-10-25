from flask import Flask, make_response, jsonify, request
from flask_migrate import Migrate
from flask_restx import Api, Resource, reqparse, fields
from models import db, User, Investor, UserInvestor, AuditTrail
from flask_cors import CORS, cross_origin
from sqlalchemy.orm import joinedload
from operator import itemgetter
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity,
)

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "usikusaccomanenos"

migrate = Migrate(app, db)

db.init_app(app)
jwt = JWTManager(app)
CORS(app)
api=Api(app)

ns = api.namespace('investor', description='User Investor')

@api.route("/")
class Home(Resource):
    def get(self):
        return make_response(jsonify({"msg": "user investors"}), 200)

@api.route("/users", methods=["GET", "POST"])
class User(Resource):
    def get(self):
    
        users = [
            {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "contact": user.contact,
            }
            for user in User.query.all()
        ]
        return make_response(jsonify({"Users": users}), 200)

    def post(self):
        data = request.get_json()
        new_user = User(
            name=data.get("name"),
            email=data.get("email"),
            contact=data.get("contact"),
            password=data.get("password"),
        )
        db.session.add(new_user)
        db.session.commit()

        user_dict = {
            "name": new_user.name,
            "email": new_user.email,
            "contact": new_user.contact,
            "password": new_user.password,
        }

        response = make_response(jsonify(user_dict), 201)
        return response


@api.route("/login", methods=["POST"])
class Login(Resource):
    def get(self):
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        user = User.query.filter_by(email=email).first()
        if user and user.password == password:
            user_dict = {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "contact": user.contact
            }
            access_token = create_access_token(identity=user_dict)
            return make_response(jsonify({"access_token": access_token, "user_id": user.id}), 200)
        else:
            return make_response(jsonify({"message": "Invalid credentials"}), 401)


@app.route("/protected", methods=["GET"])
@jwt_required()
def protected_route():
    current_user = get_jwt_identity()
    return make_response(
        jsonify({"message": f"Hello, {current_user}! This route is protected."}), 200
    )

@app.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    
    return jsonify({"message": "You have been logged out"}), 200




@app.route("/audittrails")
def Audittrails():
    audittrails = [
        {
            "id": audittrail.id,
            "timein": audittrail.timein,
            "timeout": audittrail.timeout,
        }
        for audittrail in AuditTrail.query.all()
    ]
    return make_response(jsonify({"Audittrails": audittrails}), 200)


@app.route("/investors")
def investor():
    investors = [
        {
            "id": invest.id,
            "name": invest.name,
            "company": invest.company,
            "contact": invest.contact,
        }
        for invest in Investor.query.all()
    ]
    return make_response(jsonify({"Investors": investors}), 200)


@app.route("/users/<int:id>", methods=["GET", "DELETE"])
def investor_view(id):
    if request.method == "GET":
        user = User.query.filter_by(id=id).first()

        if user:
            user_investors = user.user_investors  
            investors_info = sorted([
                {
                    "id": ui.id,
                    "name": ui.name,
                    "category": ui.category,
                    "description": ui.description,
                }
                for ui in user_investors
            ],
            key=itemgetter('id')
                                    )

            response = {
                "user_id": user.id,
                "user_name": user.name,
                "user_email": user.email,
                "investors_info": investors_info,
            }
            return make_response(jsonify(response), 200)
        else:
            return make_response(jsonify({"error": "user not found"}), 404)




    elif request.method == "DELETE":
        user = UserInvestor.query.filter_by(id=id).first()
        if user:
            UserInvestor.query.filter_by(id=id).delete()
            db.session.delete(user)
            db.session.commit()
            return make_response(jsonify("user successfully deleted", 200))
        else:
            return make_response(jsonify({"error": "user not found"}), 404)
        

@app.route("/user_investor/<int:id>", methods=["GET", "PATCH"])
def update_user_investor(id):
    user_investor = UserInvestor.query.get(id)

    if user_investor:
        data = request.get_json()
        if 'name' in data:
            user_investor.name = data['name']
        if 'category' in data:
            user_investor.category = data['category']        
        db.session.commit()  
        return make_response(jsonify({"message": "User investor updated successfully"}), 200)
    else:
        return make_response(jsonify({"error": "User investor not found"}), 404 )
    
@app.route("/user_investor1/<int:id>", methods=["GET"]) 
def user_investor(id):
    user_investor = UserInvestor.query.filter_by(id=id).first()
    if user_investor:
         response= {
             "id":user_investor.id,
             "name":user_investor.name,
             "description": user_investor.description,
             "category":user_investor.category,
         }
         return make_response(jsonify(response), 200)
    else:
        return make_response(jsonify({"error": "User Projects not found"}), 404 )
         
    
    



@app.route("/user_investors", methods=["GET", "POST"])
def user_investors_view():
    if request.method =="GET":
        user_investors = [{
            "id":userinvestor.id,
            "name":userinvestor.name,
            "category":userinvestor.category,
            "user_id":userinvestor.user_id,
            "investor_id":userinvestor.investor_id,
            "created_at":str(userinvestor.created_at),
            "updated_at":str(userinvestor.updated_at),
            "description":userinvestor.description,
        } for userinvestor in UserInvestor.query.all()]
        return make_response(jsonify({"User_investors": user_investors}), 200)
    elif request.method =="POST":
        try:
            data = request.get_json()
            if not data.get("investor_id"):
                raise ValueError("Investor ID is required.")
            
            hp = UserInvestor(
                name=data["name"],
                category=data["category"],
                user_id=data["user_id"],
                investor_id=data["investor_id"],
                description=data["description"]
            )
            db.session.add(hp)
            db.session.commit()
           
            # investor = UserInvestor.query.filter_by(id=data["investor_id"]).first()


            # if investor:
              
            investor_dict = {
                "id": hp.id,
                "name": hp.name,
                "category": hp.category,
                "description": hp.description
            }
            response = make_response(jsonify(investor_dict), 201)
            return response
            # else:
            #     # If investor does not exist
            #     raise ValueError("Investor with the provided ID does not exist.")

        except ValueError as e:
            response = make_response(jsonify({"errors": e.args}), 400)
            return response
        except Exception as e:
            response = make_response(jsonify({"errors": e.args}), 400)
            return response

@app.route("/user_investors/<int:id>", methods=["GET"])
def user_investors_by_id(id):
    if request.method == "GET":
      
        
        user_investor = (
            UserInvestor.query
            .filter_by(user_id=id)
            .options(joinedload(UserInvestor.users))  
            .first()
        )
        
        if user_investor:
            user = user_investor.users 

            response = {
                "id": user_investor.id,
                "name": user_investor.name,
                "category": user_investor.category,
                "description": user_investor.description,
                "user": {
                    "id": user.id,
                    "name": user.name,                  
                    "email": user.email
                }
            }
            return make_response(jsonify({"User_investors": [response]}), 200)

        else:
            return make_response(jsonify({"error": "user investor not found"}), 404)
        
        
@app.route("/search", methods=["GET"])  
def search(self):
    search_item= request.args.get('search', "").lower()
    results = [category for category in UserInvestor.category if search_item in category.lower()]
    return make_response(jsonify(results))
          



    
if __name__ == "__main__":
    app.run(port=5556, debug=True)
