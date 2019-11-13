u1 = User.create(name: "Dobby")
u2 = User.create(name: "Harry")
u3 = User.create(name: "Ron")
u4 = User.create(name: "Hermione")

Entry.create(user: u1, image_url: "https://cdn2.thecatapi.com/images/b9t.jpg", content: "school is cool")
Entry.create(user: u2, image_url: "https://cdn2.thecatapi.com/images/2l3.jpg", content: "Digimon gotta catch em all")
Entry.create(user: u3, image_url: "https://cdn2.thecatapi.com/images/c45.jpg", content: "were Rats were Rats were furry and forlorn")
Entry.create(user: u4, image_url: "https://cdn2.thecatapi.com/images/MTgxNzI5OQ.jpg", content: "I'll be back")
