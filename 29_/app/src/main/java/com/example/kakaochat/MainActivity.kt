package com.example.kakaochat

import android.app.Activity
import android.content.Intent
import android.graphics.BitmapFactory
import android.net.Uri
import android.os.Bundle
import android.provider.MediaStore
import android.widget.*
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView

class MainActivity : AppCompatActivity() {
    private lateinit var chatAdapter: ChatAdapter
    private val chatList = mutableListOf<ChatMessage>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val recyclerView = findViewById<RecyclerView>(R.id.recyclerView)
        val editText = findViewById<EditText>(R.id.editTextMessage)
        val sendButton = findViewById<Button>(R.id.buttonSend)
        val imageButton = findViewById<ImageButton>(R.id.buttonImage)

        chatAdapter = ChatAdapter(chatList)
        recyclerView.adapter = chatAdapter
        recyclerView.layoutManager = LinearLayoutManager(this)

        sendButton.setOnClickListener {
            val text = editText.text.toString()
            if (text.isNotBlank()) {
                chatList.add(ChatMessage(text, false, null))
                chatAdapter.notifyItemInserted(chatList.size - 1)
                recyclerView.scrollToPosition(chatList.size - 1)
                editText.text.clear()
            }
        }

        val imagePicker = registerForActivityResult(ActivityResultContracts.GetContent()) { uri: Uri? ->
            uri?.let {
                chatList.add(ChatMessage("", false, it))
                chatAdapter.notifyItemInserted(chatList.size - 1)
                recyclerView.scrollToPosition(chatList.size - 1)
            }
        }

        imageButton.setOnClickListener {
            imagePicker.launch("image/*")
        }
    }
}

data class ChatMessage(
    val message: String,
    val isMine: Boolean,
    val imageUri: Uri?
)