package com.example.kakaochat

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class LoginActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        val editId = findViewById<EditText>(R.id.editTextId)
        val editPw = findViewById<EditText>(R.id.editTextPassword)
        val btnLogin = findViewById<Button>(R.id.buttonLogin)
        val btnSignup = findViewById<Button>(R.id.buttonSignup)

        btnLogin.setOnClickListener {
            val id = editId.text.toString()
            val pw = editPw.text.toString()
            // 실제 앱에서는 서버 인증 필요, 여기선 간단히 처리
            if (id == "user" && pw == "1234") {
                startActivity(Intent(this, MainActivity::class.java))
                finish()
            } else {
                Toast.makeText(this, "로그인 실패", Toast.LENGTH_SHORT).show()
            }
        }

        btnSignup.setOnClickListener {
            startActivity(Intent(this, SignupActivity::class.java))
        }
    }
}