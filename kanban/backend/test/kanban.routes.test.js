const chai = require("chai");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { expect } = chai;
const { app } = require("../src/server");
dotenv.config();

describe("kanban Routes", () => {
	it("should create a kanban", async () => {
		const res = await chai
			.request(app)
			.post("/kanban/")
			.set("Authorization", `Bearer ${process.env.TEST_TOKEN}`)
			.send({
				title: "Test kanban",
				description: "test",
				userId: jwt.verify(process.env.TEST_TOKEN, process.env.JWT_SECRET)._id,
			});

		expect(res.status).to.eq(201);
		expect(res.body["title"]).to.exist;
		expect(res.body["title"]).to.eq("Test kanban");
		expect(res.body["description"]).to.exist;
		expect(res.body["user"]).to.exist;
		expect(res.body["_id"]).to.exist;
		this.kanbanId = res.body["_id"];
		process.env.kanban_ID = this.kanbanId;
		this.userId = res.body["user"];
	});
	it("should not create a kanban with no title", async () => {
		const res = await chai
			.request(app)
			.post("/kanban/")
			.set("Authorization", `Bearer ${process.env.TEST_TOKEN}`)
			.send({
				title: "",
				description: "test",
				userId: jwt.verify(process.env.TEST_TOKEN, process.env.JWT_SECRET)._id,
			});

		expect(res.status).to.eq(400);
	});
	it("should read a kanban", async () => {
		const res = await chai
			.request(app)
			.get(`/kanban/${this.kanbanId}`)
			.set("Authorization", `Bearer ${process.env.TEST_TOKEN}`);

		expect(res.status).to.eq(201);
		expect(res.body["title"]).to.exist;
		expect(res.body["title"]).to.eq("Test kanban");
		expect(res.body["description"]).to.exist;
		expect(res.body["user"]).to.exist;
		expect(res.body["_id"]).to.exist;
	});

	it("should update a kanban", async () => {
		const res = await chai
			.request(app)
			.put(`/kanban/${this.kanbanId}`)
			.set("Authorization", `Bearer ${process.env.TEST_TOKEN}`)
			.send({
				title: "Test kanban Updated",
				description: "test",
				userId: jwt.verify(process.env.TEST_TOKEN, process.env.JWT_SECRET)._id,
			});

		expect(res.status).to.eq(200);
		expect(res.body["title"]).to.exist;
		expect(res.body["title"]).to.eq("Test kanban Updated");
		expect(res.body["description"]).to.exist;
		expect(res.body["user"]).to.exist;
		expect(res.body["_id"]).to.exist;
	});

	it("should delete a kanban", async () => {
		const res = await chai
			.request(app)
			.delete(`/kanban/${this.kanbanId}`)
			.set("Authorization", `Bearer ${process.env.TEST_TOKEN}`);

		expect(res.status).to.eq(200);
		expect(res.body["title"]).to.exist;
		expect(res.body["title"]).to.eq("Test kanban Updated");
		expect(res.body["description"]).to.exist;
		expect(res.body["user"]).to.exist;
		expect(res.body["_id"]).to.exist;
	});

	it("should create a second kanban", async () => {
		const res = await chai
			.request(app)
			.post("/kanban/")
			.set("Authorization", `Bearer ${process.env.TEST_TOKEN}`)
			.send({
				title: "Second Test kanban",
				description: "test",
				userId: jwt.verify(process.env.TEST_TOKEN, process.env.JWT_SECRET)._id,
			});

		expect(res.status).to.eq(201);
		expect(res.body["title"]).to.exist;
		expect(res.body["title"]).to.eq("Second Test kanban");
		expect(res.body["description"]).to.exist;
		expect(res.body["user"]).to.exist;
		expect(res.body["_id"]).to.exist;
		this.kanbanId = res.body["_id"];
		process.env.kanban_ID = this.kanbanId;
		this.userId = res.body["user"];
	});

	it("should get all kanbans", async () => {
		const res = await chai
			.request(app)
			.get("/kanban/")
			.set("Authorization", `Bearer ${process.env.TEST_TOKEN}`);

		expect(res.status).to.eq(200);
		expect(res.body).to.be.an("array");
	});
});
