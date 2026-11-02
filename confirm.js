
// Firebase imports
import { auth, db } from "./firebase.js";

import {
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";

// Candidate selection
window.selectcandidate = function (candidate) {
    const params = new URLSearchParams(window.location.search);
    const regNo = params.get("regNo");

    console.log("Register Number:", regNo);

    if (!regNo) {
        alert("Student register number missing. Please login again.");
        return;
    }

    window.location.href =
        "voting%20sys(confirm).html?candidate=" +
        encodeURIComponent(candidate) +
        "&regNo=" + encodeURIComponent(regNo);
};

// Candidate details
const candidates = {
    ananya: {
        name: "Ananya",
        position: "President",
        image: "girl.png",
        message: "You have selected Ananya as your President candidate."
    },
    sameer: {
        name: "Sameer",
        position: "Secretary",
        image: "boy.png",
        message: "You have selected Sameer as your Secretary candidate."
    },
    maya: {
        name: "Maya",
        position: "Treasurer",
        image: "girl2.jpeg",
        message: "You have selected Maya as your Treasurer candidate."
    }
};

// Read URL parameters
const urlParams = new URLSearchParams(window.location.search);
const selectedcandidate = urlParams.get("candidate");
const regNo = urlParams.get("regNo");

// Display candidate only on confirmation page
const candidateName = document.getElementById("candidateName");

if (candidateName) {
    if (selectedcandidate && candidates[selectedcandidate]) {
        const candidate = candidates[selectedcandidate];

        candidateName.textContent = candidate.name;
        document.getElementById("candidatePosition").textContent = candidate.position;
        document.getElementById("candidateImage").src = candidate.image;
        document.getElementById("candidateMessage").textContent = candidate.message;
    } else {
        candidateName.textContent = "No Candidate Selected";
    }
}

// Confirm vote
async function confirmVote() {
    const confirmButton = document.getElementById("confirmBtn");

    if (!selectedcandidate || !candidates[selectedcandidate]) {
        alert("Please select a candidate first.");
        return;
    }

    if (!regNo) {
        alert("Student register number missing. Please login again.");
        return;
    }

    confirmButton.disabled = true;

    try {
        const user = auth.currentUser;

        if (!user) {
            alert("Please login first.");
            return;
        }
        const electionRef = doc(db, "election", "current");
        const electionSnap = await getDoc(electionRef);

        if (!electionSnap.exists() || electionSnap.data().status !== "active") {
            alert("Voting is not currently active. Please check with the admin.");
            return;
        }

        const studentRef = doc(db, "students", regNo);
        const studentSnap = await getDoc(studentRef);

        if (!studentSnap.exists()) {
            alert("Student record not found.");
            return;
        }

        if (studentSnap.data().email !== user.email) {
            alert("Invalid student account.");
            return;
        }

        if (studentSnap.data().hasVoted === true) {
            alert("You have already voted!");
            return;
        }
        console.log("Logged-in email:", user.email);
        console.log("Student email:", studentSnap.data().email);
        console.log("Register number:", regNo);
        console.log("Has voted:", studentSnap.data().hasVoted);
        console.log("Election status:", electionSnap.data().status);
        console.log("Selected candidate:", selectedcandidate);

        await updateDoc(studentRef, {
            hasVoted: true,
            selectedCandidate: selectedcandidate
        });

        document.querySelector(".confirmation-card").style.display = "none";
        document.getElementById("successMessage").style.display = "block";

    } catch (error) {
        console.error(error);
        alert("Vote could not be saved. Please try again.");
    } finally {
        confirmButton.disabled = false;
    }
}

// Unselect candidate
function unselectCandidate() {
    window.location.href =
        "voting%20sys(candidates).html?regNo=" +
        encodeURIComponent(regNo || "");
}

// Go to home
function goToHome() {
    window.location.href = "index.html";
}

window.confirmVote = confirmVote;
window.unselectCandidate = unselectCandidate;
window.goToHome = goToHome;
