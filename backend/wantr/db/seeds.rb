# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
#
user1 = User.create(name: 'Jimmy Rain', bio: 'a plus')
user2 = User.create(name: 'Kim Possible', bio: 'a plus')
#
goal1 = Goal.create(title: 'Run a marathon', category: 'Fitness', user_id: User.find(3).id)
goal2 = Goal.create(title: 'Wake up earlier', category: 'Lifestyle', user_id: User.find(3).id)
goal3 = Goal.create(title: 'Get a 850 credit score', category: 'Finance', user_id: User.find(3).id)
goal4 = Goal.create(title: 'Hang Glide in Brazil', category: 'Travel', user_id: User.find(3).id)
goal5 = Goal.create(title: 'Watch all of Gotham', category: 'Entertainment', user_id: User.find(3).id)
goal6 = Goal.create(title: 'Learn a new language', category: 'Education', user_id: User.find(3).id)
goal7 = Goal.create(title: 'Get better at SQL commands', category: 'Education', user_id: User.find(3).id)
goal8 = Goal.create(title: 'Finish 20 books', category: 'Education', user_id: User.find(3).id)
goal9 = Goal.create(title: 'Eat a large double decker pizza solo', category: 'Entertainment', user_id: User.find(3).id)
goal10 = Goal.create(title: 'Go to Spain', category: 'Travel', user_id: User.find(3).id)
