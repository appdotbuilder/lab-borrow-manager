<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBorrowingRequestRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'item_type' => 'required|in:equipment,room',
            'item_id' => 'required|integer|min:1',
            'jumlah' => 'required_if:item_type,equipment|integer|min:1',
            'tanggal_peminjaman' => 'required|date|after_or_equal:today',
            'tanggal_kembali' => 'required|date|after:tanggal_peminjaman',
            'keterangan' => 'nullable|string|max:1000',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'item_type.required' => 'Jenis item wajib dipilih.',
            'item_type.in' => 'Jenis item harus alat atau ruang.',
            'item_id.required' => 'Item wajib dipilih.',
            'jumlah.required_if' => 'Jumlah wajib diisi untuk peminjaman alat.',
            'jumlah.min' => 'Jumlah minimal 1.',
            'tanggal_peminjaman.required' => 'Tanggal peminjaman wajib diisi.',
            'tanggal_peminjaman.after_or_equal' => 'Tanggal peminjaman tidak boleh sebelum hari ini.',
            'tanggal_kembali.required' => 'Tanggal kembali wajib diisi.',
            'tanggal_kembali.after' => 'Tanggal kembali harus setelah tanggal peminjaman.',
        ];
    }
}